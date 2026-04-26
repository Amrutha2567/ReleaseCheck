# ReleaseCheck
# 🚀 Release Checklist Tool

A simple full-stack web application to help developers manage release processes using a checklist-based approach.

---

## ✨ Features

- 📋 View all releases
- ➕ Create a new release (name, date, additional info)
- ✅ Toggle checklist steps for each release
- 🔄 Automatically computed release status:
  - **Planned** → No steps completed
  - **Ongoing** → Some steps completed
  - **Done** → All steps completed
- 📝 Update additional information
- 🗑️ Delete releases (optional feature)

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Axios

### Backend
- Node.js
- Express

### Database
- PostgreSQL
- Prisma ORM

### Deployment
- Frontend: Vercel / Replit
- Backend: Render / Replit
- DB: Neon / Supabase

---

## 🧠 Architecture

- Single Page Application (SPA)
- REST API for communication
- Steps stored as JSON (fixed checklist)
- Status computed dynamically (not stored in DB)

---

## 🗄️ Database Schema

```prisma
model Release {
  id             String   @id @default(uuid())
  name           String
  date           DateTime
  additionalInfo String?
  steps          Json
  createdAt      DateTime @default(now())
}
