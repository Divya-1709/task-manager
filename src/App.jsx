import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("Pending");

  const addTask = () => {
    if (taskName.trim() === "" || assignee.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      assignee,
      status,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setAssignee("");
    setStatus("Pending");
  };

  const updateStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Assignment & Tracking App</h1>

      {/* Task Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assign To"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No tasks added yet.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="task">
                <div>
                  <strong>{task.name}</strong> <br />
                  <small>Assigned to: {task.assignee}</small> <br />
                  <span
                    className={`status ${task.status.toLowerCase()}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="actions">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(task.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
