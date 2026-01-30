'use client'

import { Task, TaskStatus } from '@/lib/supabase'
import { TaskCard } from './TaskCard'

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
}

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-zinc-900/50 border-zinc-800',
  in_progress: 'bg-zinc-900/50 border-blue-900/30',
  review: 'bg-zinc-900/50 border-yellow-900/30',
  done: 'bg-zinc-900/50 border-green-900/30',
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
