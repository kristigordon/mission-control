'use client'

import { Task, TaskTag } from '@/lib/supabase'

const tagColors: Record<TaskTag, string> = {
  'Socials': 'bg-purple-100 text-purple-800 border-purple-200',
  'SkillStamp': 'bg-blue-100 text-blue-800 border-blue-200',
  'Digital Doula': 'bg-pink-100 text-pink-800 border-pink-200',
  'Copy Cat': 'bg-orange-100 text-orange-800 border-orange-200',
  'Helix Health': 'bg-green-100 text-green-800 border-green-200',
}

interface TaskCardProps {
  task: Task
  onDragStart: (e: React.DragEvent, task: Task) => void
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h3>
      </div>
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full border ${tagColors[task.tag]}`}>
          {task.tag}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
