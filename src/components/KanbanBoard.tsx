'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase, Task, TaskStatus, TaskTag } from '@/lib/supabase'
import { Column } from './Column'

const statuses: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'done']
const tags: TaskTag[] = ['Socials', 'SkillStamp', 'Digital Doula', 'Copy Cat', 'Helix Health']

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filterTag, setFilterTag] = useState<TaskTag | 'all'>('all')
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching tasks:', error)
      return
    }
    
    setTasks(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTasks()
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('tasks_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTasks])

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault()
    
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null)
      return
    }

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTask.id
          ? { ...t, status: newStatus, completed_at: newStatus === 'done' ? new Date().toISOString() : null }
          : t
      )
    )

    const { error } = await supabase
      .from('tasks')
      .update({ 
        status: newStatus, 
        updated_at: new Date().toISOString(),
        completed_at: newStatus === 'done' ? new Date().toISOString() : null
      })
      .eq('id', draggedTask.id)

    if (error) {
      console.error('Error updating task:', error)
      fetchTasks() // Revert on error
    }

    setDraggedTask(null)
  }

  const filteredTasks = filterTag === 'all' 
    ? tasks 
    : tasks.filter((t) => t.tag === filterTag)

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((t) => t.status === status)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground font-medium">Filter:</span>
        <button
          onClick={() => setFilterTag('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filterTag === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-card-foreground">{tasks.length}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-blue-500">
            {tasks.filter((t) => t.status === 'in_progress').length}
          </div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-green-500">
            {tasks.filter((t) => t.status === 'done').length}
          </div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="text-2xl font-bold text-yellow-500">
            {tasks.filter((t) => t.status === 'todo' || t.status === 'backlog').length}
          </div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  )
}
