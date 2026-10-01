import { useEffect, useMemo, useState } from "react";
import "./App.css";

const initialProjects = [
  {
    id: 1,
    name: "Aeris",
    description: "Modern web experience built with React.",
    status: "Completed",
    progress: 100,
    icon: "A",
  },
  {
    id: 2,
    name: "Sonara",
    description: "Premium audio product web application.",
    status: "Active",
    progress: 72,
    icon: "S",
  },
  {
    id: 3,
    name: "Devspace",
    description: "Developer workspace and productivity app.",
    status: "Active",
    progress: 48,
    icon: "D",
  },
];

const initialTasks = [
  {
    id: 1,
    title: "Finish Nexus dashboard",
    project: "Nexus",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Improve Sonara product cards",
    project: "Sonara",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Deploy Aeris",
    project: "Aeris",
    priority: "Low",
    completed: true,
  },
  {
    id: 4,
    title: "Build responsive layout",
    project: "Nexus",
    priority: "High",
    completed: false,
  },
];

const initialNotes = [
  {
    id: 1,
    title: "Nexus ideas",
    content: "Add charts, project filters and a command palette.",
  },
  {
    id: 2,
    title: "Next project",
    content: "Build something with a real API after Nexus.",
  },
];

const initialActivity = [
  {
    id: 1,
    title: "Aeris deployed",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Sonara updated",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "New task created",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Devspace edited",
    time: "2 days ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("nexus-projects")) || initialProjects;
  });

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("nexus-tasks")) || initialTasks;
  });

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("nexus-notes")) || initialNotes;
  });

  const [activity, setActivity] = useState(() => {
    return JSON.parse(localStorage.getItem("nexus-activity")) || initialActivity;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("nexus-theme") || "dark";
  });

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const [newTask, setNewTask] = useState({
    title: "",
    project: "Nexus",
    priority: "Medium",
  });

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    localStorage.setItem("nexus-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("nexus-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("nexus-notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("nexus-activity", JSON.stringify(activity));
  }, [activity]);

  useEffect(() => {
    localStorage.setItem("nexus-theme", theme);
    document.body.className = theme;
  }, [theme]);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const activeProjects = projects.filter(
    (project) => project.status === "Active"
  ).length;

  const averageProgress = projects.length
    ? Math.round(
        projects.reduce((sum, project) => sum + project.progress, 0) /
          projects.length
      )
    : 0;

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase();

    const projectResults = projects
      .filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      )
      .map((project) => ({
        type: "Project",
        title: project.name,
        description: project.description,
      }));

    const taskResults = tasks
      .filter((task) => task.title.toLowerCase().includes(query))
      .map((task) => ({
        type: "Task",
        title: task.title,
        description: `${task.project} • ${task.priority}`,
      }));

    const noteResults = notes
      .filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      )
      .map((note) => ({
        type: "Note",
        title: note.title,
        description: note.content,
      }));

    return [...projectResults, ...taskResults, ...noteResults];
  }, [search, projects, tasks, notes]);

  function addActivity(title) {
    const newActivity = {
      id: Date.now(),
      title,
      time: "Just now",
    };

    setActivity((prev) => [newActivity, ...prev].slice(0, 8));
  }

  function addProject(e) {
    e.preventDefault();

    if (!newProject.name.trim()) return;

    const project = {
      id: Date.now(),
      name: newProject.name,
      description:
        newProject.description || "New project added to your workspace.",
      status: "Active",
      progress: 0,
      icon: newProject.name.charAt(0).toUpperCase(),
    };

    setProjects((prev) => [...prev, project]);

    addActivity(`${project.name} created`);

    setNewProject({
      name: "",
      description: "",
    });

    setShowProjectModal(false);
  }

  function addTask(e) {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      project: newTask.project,
      priority: newTask.priority,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);

    addActivity(`Task "${task.title}" created`);

    setNewTask({
      title: "",
      project: "Nexus",
      priority: "Medium",
    });

    setShowTaskModal(false);
  }

  function addNote(e) {
    e.preventDefault();

    if (!newNote.title.trim()) return;

    const note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
    };

    setNotes((prev) => [note, ...prev]);

    addActivity(`Note "${note.title}" created`);

    setNewNote({
      title: "",
      content: "",
    });

    setShowNoteModal(false);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }

  function resetData() {
    if (!window.confirm("Reset all Nexus data?")) return;

    setProjects(initialProjects);
    setTasks(initialTasks);
    setNotes(initialNotes);
    setActivity(initialActivity);
  }

  function navigate(page) {
    setActivePage(page);
    setSearch("");
  }

  return (
    <div className={`app ${theme}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">N</div>
          <span>NEXUS</span>
        </div>

        <nav className="nav">
          <button
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => navigate("Dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className={activePage === "Projects" ? "active" : ""}
            onClick={() => navigate("Projects")}
          >
            <span>▦</span>
            Projects
          </button>

          <button
            className={activePage === "Tasks" ? "active" : ""}
            onClick={() => navigate("Tasks")}
          >
            <span>✓</span>
            Tasks
            <em>{tasks.filter((task) => !task.completed).length}</em>
          </button>

          <button
            className={activePage === "Notes" ? "active" : ""}
            onClick={() => navigate("Notes")}
          >
            <span>▤</span>
            Notes
          </button>

          <button
            className={activePage === "Analytics" ? "active" : ""}
            onClick={() => navigate("Analytics")}
          >
            <span>◒</span>
            Analytics
          </button>
        </nav>

        <div className="sidebar-label">SYSTEM</div>

        <nav className="nav">
          <button
            className={activePage === "Settings" ? "active" : ""}
            onClick={() => navigate("Settings")}
          >
            <span>⚙</span>
            Settings
          </button>
        </nav>

        <div className="system-status">
          <span></span>
          <div>
            <strong>System Online</strong>
            <small>All systems operational</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <p className="eyebrow">PERSONAL COMMAND CENTER</p>
            <h1>
              {activePage === "Dashboard"
                ? "Good afternoon, Mmdzp."
                : activePage}
            </h1>
          </div>

          <div className="header-actions">
            <button
              className="search-button"
              onClick={() => setShowSearch(true)}
            >
              <span>⌕</span>
              Search
              <kbd>Ctrl K</kbd>
            </button>

            <button
              className="icon-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
            >
              {theme === "dark" ? "☼" : "☾"}
            </button>

            <button
              className="avatar"
              onClick={() => navigate("Settings")}
              title="Settings"
            >
              M
            </button>
          </div>
        </header>

        {activePage === "Dashboard" && (
          <>
            <section className="stats">
              <div className="stat-card">
                <div className="stat-icon blue">◉</div>
                <div>
                  <span>CPU Usage</span>
                  <strong>32%</strong>
                  <small>Normal</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple">◈</div>
                <div>
                  <span>Memory</span>
                  <strong>61%</strong>
                  <small>9.8 / 16 GB</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon orange">▰</div>
                <div>
                  <span>Storage</span>
                  <strong>74%</strong>
                  <small>356 GB used</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">✦</div>
                <div>
                  <span>Projects</span>
                  <strong>{projects.length}</strong>
                  <small>{activeProjects} active</small>
                </div>
              </div>
            </section>

            <section className="dashboard-grid">
              <div className="panel projects-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">WORKSPACE</p>
                    <h2>Projects</h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => navigate("Projects")}
                  >
                    View all →
                  </button>
                </div>

                <div className="projects">
                  {projects.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={deleteProject}
                    />
                  ))}
                </div>
              </div>

              <div className="panel activity-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">RECENT</p>
                    <h2>Activity</h2>
                  </div>
                </div>

                <ActivityList activity={activity} />
              </div>
            </section>

            <section className="bottom-grid">
              <div className="panel tasks-preview">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">TODAY</p>
                    <h2>Tasks</h2>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => navigate("Tasks")}
                  >
                    Manage →
                  </button>
                </div>

                <TaskList
                  tasks={tasks.slice(0, 4)}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>

              <div className="panel quick-actions">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">QUICK ACCESS</p>
                    <h2>Actions</h2>
                  </div>
                </div>

                <div className="quick-grid">
                  <button onClick={() => setShowProjectModal(true)}>
                    <span>＋</span>
                    New Project
                  </button>

                  <button onClick={() => setShowTaskModal(true)}>
                    <span>✓</span>
                    New Task
                  </button>

                  <button onClick={() => setShowNoteModal(true)}>
                    <span>✎</span>
                    New Note
                  </button>

                  <button onClick={() => navigate("Analytics")}>
                    <span>◒</span>
                    Analytics
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === "Projects" && (
          <PageContainer
            eyebrow="WORKSPACE"
            title="All Projects"
            action={
              <button
                className="primary-button"
                onClick={() => setShowProjectModal(true)}
              >
                + New Project
              </button>
            }
          >
            <div className="full-project-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={deleteProject}
                />
              ))}

              {projects.length === 0 && (
                <EmptyState text="No projects yet." />
              )}
            </div>
          </PageContainer>
        )}

        {activePage === "Tasks" && (
          <PageContainer
            eyebrow="PRODUCTIVITY"
            title="Task Manager"
            action={
              <button
                className="primary-button"
                onClick={() => setShowTaskModal(true)}
              >
                + New Task
              </button>
            }
          >
            <div className="task-summary">
              <div>
                <strong>{tasks.length}</strong>
                <span>Total Tasks</span>
              </div>

              <div>
                <strong>{completedTasks}</strong>
                <span>Completed</span>
              </div>

              <div>
                <strong>{tasks.length - completedTasks}</strong>
                <span>Remaining</span>
              </div>
            </div>

            <div className="large-list">
              <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>
          </PageContainer>
        )}

        {activePage === "Notes" && (
          <PageContainer
            eyebrow="KNOWLEDGE"
            title="Notes"
            action={
              <button
                className="primary-button"
                onClick={() => setShowNoteModal(true)}
              >
                + New Note
              </button>
            }
          >
            <div className="notes-grid">
              {notes.map((note) => (
                <article className="note-card" key={note.id}>
                  <div className="note-card-top">
                    <span>✎</span>
                    <button onClick={() => deleteNote(note.id)}>×</button>
                  </div>

                  <h3>{note.title}</h3>
                  <p>{note.content || "Empty note."}</p>
                </article>
              ))}

              {notes.length === 0 && <EmptyState text="No notes yet." />}
            </div>
          </PageContainer>
        )}

        {activePage === "Analytics" && (
          <PageContainer eyebrow="INSIGHTS" title="Analytics">
            <div className="analytics-grid">
              <div className="analytics-card large">
                <p className="eyebrow">PROJECT COMPLETION</p>
                <strong>{averageProgress}%</strong>

                <div className="big-progress">
                  <div style={{ width: `${averageProgress}%` }}></div>
                </div>

                <span>Average progress across all projects</span>
              </div>

              <div className="analytics-card">
                <p className="eyebrow">TASK COMPLETION</p>
                <strong>
                  {tasks.length
                    ? Math.round((completedTasks / tasks.length) * 100)
                    : 0}
                  %
                </strong>
                <span>
                  {completedTasks} of {tasks.length} tasks completed
                </span>
              </div>

              <div className="analytics-card">
                <p className="eyebrow">ACTIVE PROJECTS</p>
                <strong>{activeProjects}</strong>
                <span>Currently in development</span>
              </div>
            </div>

            <div className="panel analytics-table">
              <div className="section-header">
                <div>
                  <p className="eyebrow">PROJECT DATA</p>
                  <h2>Progress Overview</h2>
                </div>
              </div>

              {projects.map((project) => (
                <div className="analytics-row" key={project.id}>
                  <div>
                    <span className="mini-icon">{project.icon}</span>
                    <strong>{project.name}</strong>
                  </div>

                  <div className="analytics-bar">
                    <div style={{ width: `${project.progress}%` }}></div>
                  </div>

                  <span>{project.progress}%</span>
                </div>
              ))}
            </div>
          </PageContainer>
        )}

        {activePage === "Settings" && (
          <PageContainer eyebrow="SYSTEM" title="Settings">
            <div className="settings-list">
              <div className="setting">
                <div>
                  <strong>Appearance</strong>
                  <span>Choose the interface theme.</span>
                </div>

                <button
                  className="theme-switch"
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                >
                  {theme === "dark" ? "Dark" : "Light"}
                </button>
              </div>

              <div className="setting">
                <div>
                  <strong>Local Storage</strong>
                  <span>Your Nexus data is stored locally in your browser.</span>
                </div>

                <span className="online-label">Active</span>
              </div>

              <div className="setting danger-setting">
                <div>
                  <strong>Reset Workspace</strong>
                  <span>Restore all projects, tasks and notes.</span>
                </div>

                <button className="danger-button" onClick={resetData}>
                  Reset Data
                </button>
              </div>
            </div>
          </PageContainer>
        )}
      </main>

      {showSearch && (
        <div className="overlay" onClick={() => setShowSearch(false)}>
          <div
            className="search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-wrapper">
              <span>⌕</span>

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tasks or notes..."
              />

              <button onClick={() => setShowSearch(false)}>Esc</button>
            </div>

            {search && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div className="search-result" key={index}>
                      <span>{result.type}</span>
                      <div>
                        <strong>{result.title}</strong>
                        <p>{result.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState text="No results found." />
                )}
              </div>
            )}

            {!search && (
              <div className="search-hint">
                Start typing to search across your workspace.
              </div>
            )}
          </div>
        </div>
      )}

      {showProjectModal && (
        <Modal
          title="Create Project"
          onClose={() => setShowProjectModal(false)}
        >
          <form onSubmit={addProject}>
            <label>Project name</label>

            <input
              value={newProject.name}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  name: e.target.value,
                })
              }
              placeholder="e.g. Nova"
              autoFocus
            />

            <label>Description</label>

            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  description: e.target.value,
                })
              }
              placeholder="What are you building?"
            />

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowProjectModal(false)}
              >
                Cancel
              </button>

              <button className="primary-button">Create Project</button>
            </div>
          </form>
        </Modal>
      )}

      {showTaskModal && (
        <Modal title="Create Task" onClose={() => setShowTaskModal(false)}>
          <form onSubmit={addTask}>
            <label>Task title</label>

            <input
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
              placeholder="What needs to be done?"
              autoFocus
            />

            <label>Project</label>

            <select
              value={newTask.project}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  project: e.target.value,
                })
              }
            >
              <option>Nexus</option>

              {projects.map((project) => (
                <option key={project.id}>{project.name}</option>
              ))}
            </select>

            <label>Priority</label>

            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value,
                })
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowTaskModal(false)}
              >
                Cancel
              </button>

              <button className="primary-button">Create Task</button>
            </div>
          </form>
        </Modal>
      )}

      {showNoteModal && (
        <Modal title="Create Note" onClose={() => setShowNoteModal(false)}>
          <form onSubmit={addNote}>
            <label>Title</label>

            <input
              value={newNote.title}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  title: e.target.value,
                })
              }
              placeholder="Note title"
              autoFocus
            />

            <label>Content</label>

            <textarea
              rows="6"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({
                  ...newNote,
                  content: e.target.value,
                })
              }
              placeholder="Write your note..."
            />

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowNoteModal(false)}
              >
                Cancel
              </button>

              <button className="primary-button">Save Note</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function ProjectCard({ project, onDelete }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <span className="project-icon">{project.icon}</span>

        <div className="project-actions">
          <span
            className={`badge ${
              project.status === "Completed"
                ? "completed"
                : "active-badge"
            }`}
          >
            {project.status}
          </span>

          <button
            className="delete-button"
            onClick={() => onDelete(project.id)}
            title="Delete project"
          >
            ×
          </button>
        </div>
      </div>

      <h3>{project.name}</h3>

      <p>{project.description}</p>

      <div className="progress">
        <div style={{ width: `${project.progress}%` }}></div>
      </div>

      <span className="progress-text">
        {project.progress}% complete
      </span>
    </article>
  );
}

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <EmptyState text="No tasks yet." />;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className={`task ${task.completed ? "done" : ""}`} key={task.id}>
          <button
            className="check-button"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? "✓" : ""}
          </button>

          <div className="task-info">
            <strong>{task.title}</strong>
            <span>
              {task.project} • {task.priority}
            </span>
          </div>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <button
            className="delete-button"
            onClick={() => onDelete(task.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function ActivityList({ activity }) {
  return (
    <div className="activity-list">
      {activity.map((item) => (
        <div className="activity" key={item.id}>
          <span className="activity-dot"></span>

          <div>
            <strong>{item.title}</strong>
            <p>{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PageContainer({ eyebrow, title, action, children }) {
  return (
    <section className="page-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>

        {children}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

export default App;