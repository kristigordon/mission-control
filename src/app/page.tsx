import { KanbanBoard } from '@/components/KanbanBoard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🦉</span>
            <h1 className="text-3xl font-bold text-gray-900">Mission Control</h1>
          </div>
          <p className="text-gray-600">
            Athena&apos;s task dashboard — tracking work across all projects
          </p>
        </div>

        {/* Kanban Board */}
        <KanbanBoard />

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-400">
          Managed by Athena 🦉 • Updated in real-time
        </div>
      </div>
    </main>
  )
}
