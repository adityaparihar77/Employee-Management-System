import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css"; // Import custom CSS

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employee/tasks", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected token format
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data?.message || error.message);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      }
    }
  };

  const completeTask = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/employee/complete-task/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected token format
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as complete:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="employee-container">
      <aside className="sidebar">
        <h2>Employee Dashboard</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="dashboard-content">
        <h2>Your Assigned Tasks</h2>
        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks assigned yet.</p>
          ) : (
            tasks.map((task) => (
              <div className={`task-card ${task.completed ? "completed" : ""}`} key={task._id}>
                <p>{task.description}</p>
                {!task.completed ? (
                  <button className="complete-btn" onClick={() => completeTask(task._id)}>Mark Complete</button>
                ) : (
                  <span className="completed-text">✔ Completed</span>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
