import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import custom CSS

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed Authorization header
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error.response?.data?.message || error.message);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        logout();
      }
    }
  };

  const addEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/add-employee",
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchEmployees(); // Refresh the employee list
      setName("");
      setEmail("");
      setPassword("");
      alert("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error.response?.data?.message || error.message);
    }
  };

  const removeEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/remove-employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees(); // Refresh the list
      alert("Employee removed successfully!");
    } catch (error) {
      console.error("Error removing employee:", error.response?.data?.message || error.message);
    }
  };

  const assignTask = async () => {
    if (!selectedEmployee || !taskDesc.trim()) {
      alert("Please select an employee and enter a task description.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/assign-task",
        { employeeId: selectedEmployee, description: taskDesc },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTaskDesc("");
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Error assigning task:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Welcome Aditya</h2>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="dashboard-content">
        {/* Add Employee Section */}
        <div className="card">
          <h3>Add Employee</h3>
          <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input value={password} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="add-btn" onClick={addEmployee}>Add Employee</button>
        </div>

        {/* Employees List Section */}
        <div className="card">
          <h3>Employees</h3>
          <ul>
            {employees.length === 0 ? (
              <p>No employees found.</p>
            ) : (
              employees.map((emp) => (
                <li key={emp._id}>
                  {emp.name} - {emp.email}
                  <button className="remove-btn" onClick={() => removeEmployee(emp._id)}>Remove</button>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Assign Task Section */}
        <div className="card">
          <h3>Assign Task</h3>
          <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
          <input value={taskDesc} placeholder="Task Description" onChange={(e) => setTaskDesc(e.target.value)} />
          <button className="assign-btn" onClick={assignTask}>Assign Task</button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
