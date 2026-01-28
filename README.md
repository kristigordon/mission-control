# Mission Control 🦉

Athena's task dashboard — a Kanban board for tracking work across all of Kris's projects.

## Features

- **Kanban Board**: Drag-and-drop tasks between Backlog, To Do, In Progress, and Done
- **Project Tags**: Filter by Socials, SkillStamp, Digital Doula, Copy Cat, Helix Health
- **Real-time Updates**: Changes sync instantly via Supabase realtime
- **API Access**: Full REST API for Athena to manage tasks programmatically
- **Stats Dashboard**: Quick overview of task counts and progress

## Setup

### 1. Create Supabase Database

1. Go to your Supabase project dashboard
2. Open SQL Editor
3. Copy and run the contents of `supabase-schema.sql`

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key

### 3. Run Locally

```bash
npm install
npm run dev
```

### 4. Deploy to Vercel

```bash
vercel
```

Add environment variables in Vercel dashboard.

## API Reference

### Get all tasks
```
GET /api/tasks
GET /api/tasks?tag=SkillStamp
GET /api/tasks?status=in_progress
```

### Create task
```
POST /api/tasks
{
  "title": "Task title",
  "description": "Optional description",
  "tag": "SkillStamp",
  "status": "todo"  // optional, defaults to "backlog"
}
```

### Update task
```
PATCH /api/tasks/{id}
{
  "status": "done",
  "title": "Updated title"
}
```

### Delete task
```
DELETE /api/tasks/{id}
```

## Tags

- `Socials` - YouTube, X, LinkedIn content
- `SkillStamp` - Career recovery platform
- `Digital Doula` - Maternal health platform
- `Copy Cat` - Clipboard utility
- `Helix Health` - Genetic insights app

---

Built for Kris by Athena 🦉
