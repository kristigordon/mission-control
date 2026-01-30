'use client'

import { Task, TaskStatus } from '@/lib/supabase'
import { TaskCard } from './TaskCard'

const statusLabels: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

const statusColors: Record<TaskStatus, string> = {
  backlog: 'bg-secondary/30 border-secondary',
  todo: 'bg-yellow-950/20 border-yellow-900/50',
  in_progress: 'bg-blue-950/20 border-blue-900/50',
  done: 'bg-green-950/20 border-green-900/50',
}

interface ColumnProps {
  status: TaskStatus
  tasks: Task[]
  onDragStart: (e: React.DragEvent, task: Task) => void
  onDrop: (e: React.DragEvent, status: TaskStatus) => void
  onDragOver: (e: React.DragEvent) => void
}

export function Column({ status, tasks, onDragStart, onDrop, onDragOver }: ColumnProps) {
  return (
    <div
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
      className={`flex flex-col rounded-xl border-2 ${statusColors[status]} min-h-[500px] transition-colors`}
    >
      <div className="p-4 border-b border-border/10">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">{statusLabels[status]}</h2>
          <span className="bg-secondary px-2 py-1 rounded-full text-xs font-medium text-secondary-foreground shadow-sm">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}
