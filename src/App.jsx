import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

const NEXT = { todo: "doing", doing: "done", done: "todo" };

export default function App() {
  const [tasks, setTasks] = useLocalStorage("task-board:tasks", [
    { id: 1, text: "Add searchBox in headline", status: "doing" },
    { id: 2, text: "Add this project to my GitHub", status: "todo" },
  ]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () => tasks.filter((t) => t.text.toLowerCase().includes(query.toLowerCase())),
    [tasks, query]
  );

  function addTask(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, status: "todo" }]);
    setText("");
  }

  const move = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: NEXT[t.status] } : t)));

  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <main className="app">
      <header>
        <h1>Task Board</h1>
        <p className="muted">
          {doneCount} of {tasks.length} tasks done
        </p>
      </header>

      <form onSubmit={addTask} className="toolbar">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          aria-label="New task"
        />
        <button type="submit">Add</button>
        <input
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          aria-label="Search tasks"
        />
      </form>

      <section className="board">
        {COLUMNS.map((col) => {
          const items = visible.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="column">
              <h2>
                {col.title} <span className="badge">{items.length}</span>
              </h2>
              {items.length === 0 && <p className="muted">Nothing here</p>}
              <ul>
                {items.map((t) => (
                  <li key={t.id}>
                    <span>{t.text}</span>
                    <div className="actions">
                      <button onClick={() => move(t.id)} title="Move to next column">
                        →
                      </button>
                      <button onClick={() => remove(t.id)} title="Delete" className="danger">
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </main>
  );
}
