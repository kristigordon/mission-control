'use client'

import { Task, TaskTag } from '@/lib/supabase'

// Updated for dark mode readability
const tagColors: Record<TaskTag, string> = {
  'Socials': 'bg-purple-950 text-purple-200 border-purple-800',
  'SkillStamp': 'bg-blue-950 text-blue-200 border-blue-800',
  'Digital Doula': 'bg-pink-950 text-pink-200 border-pink-800',
  'Copy Cat': 'bg-orange-950 text-orange-200 border-orange-800',
  'Helix Health': 'bg-green-950 text-green-200 border-green-800',
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
      className="bg-card rounded-lg shadow-sm border border-border p-4 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-card-foreground text-sm leading-tight">{task.title}</h3>
      </div>
      {task.description && (
        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full border ${tagColors[task.tag] || 'bg-secondary text-secondary-foreground border-border'}`}>
          {task.tag}
        </span>
        {task.completed_at ? (
            <span className="text-xs text-green-500 font-medium">Done</span>
        ) : (
             <span className="text-xs text-muted-foreground">
               {new Date(task.created_at).toLocaleDateString()}
             </span>
        )}
      </div>
    </div>
  )
}
