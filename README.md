# NEXUS

### Personal Command Center

NEXUS is a modern personal command center built with React.
It brings projects, tasks, notes, activity, analytics and settings together in one focused workspace.

> Built to manage work. Designed to stay focused.

---

## 🚀 Live Demo

**[Open NEXUS →](https://mr-mmdzp.github.io/Nexus/)**

---
## 📸 Preview

![NEXUS Dashboard](./screenshots/preview.png)
---
## ✨ Features

- 📊 Dashboard overview
- 📁 Project management
- ✅ Task management
- 📝 Notes
- 📈 Analytics
- 🔎 Global search
- 🌙 Dark / Light mode
- 💾 LocalStorage persistence
- ⚡ Quick actions
- 📱 Responsive interface
- 🗑️ Delete and manage projects, tasks and notes
- 🔄 Persistent application state

---

## 🖥️ Dashboard

The dashboard gives you a quick overview of your workspace:

- Active projects
- Completed tasks
- Project progress
- Recent activity
- Quick actions

Everything important is available without leaving the main workspace.

---

## 📁 Projects

Create and manage your projects from one place.

Each project can contain:

- Project name
- Description
- Progress
- Status
- Activity

NEXUS keeps your projects organized so you can focus on building instead of managing files.

---

## ✅ Tasks

A simple task management system for keeping track of your work.

You can:

- Create tasks
- Mark tasks as completed
- Delete tasks
- Track completion progress

---

## 📝 Notes

Keep important ideas, reminders and development notes inside your workspace.

Notes are stored locally so your data remains available between sessions.

---

## 📈 Analytics

NEXUS provides a simple overview of your workspace activity.

It tracks things such as:

- Average project progress
- Task completion
- Active projects
- Workspace activity

---

## 🔎 Search

Use the global search to quickly find:

- Projects
- Tasks
- Notes

No need to manually search through every section.

---

## 🎨 Theme

NEXUS supports both:

- Dark Mode
- Light Mode

Your selected theme is saved automatically.

---

## 💾 Local Storage

NEXUS uses browser `localStorage` to persist application data.

Your:

- Projects
- Tasks
- Notes
- Activity
- Theme

remain available after refreshing or reopening the application.

> No backend or external database is required.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI & component architecture |
| Vite | Development & build tooling |
| JavaScript | Application logic |
| CSS | Interface & responsive design |
| LocalStorage | Client-side persistence |
| Git & GitHub | Version control & deployment |

---

## 📂 Project Structure

```text
NEXUS/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
