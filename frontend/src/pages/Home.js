import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      const updatedTasks = tasks.map((task) =>
        task._id === data._id ? data : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h1>Task Management</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <Item task={task} handleStatusUpdate={handleStatusUpdate} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
