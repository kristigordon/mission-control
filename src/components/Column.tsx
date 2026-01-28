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
  backlog: 'bg-gray-100 border-gray-300',
  todo: 'bg-yellow-50 border-yellow-300',
  in_progress: 'bg-blue-50 border-blue-300',
  done: 'bg-green-50 border-green-300',
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
      className={`flex flex-col rounded-xl border-2 ${statusColors[status]} min-h-[500px]`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">{statusLabels[status]}</h2>
          <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            No tasks
          </div>
        )}
      </div>
    </div>
  )
}
