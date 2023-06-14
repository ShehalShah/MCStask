import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from '../components/Item';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://mcsbackexpress.adaptable.app/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`https://mcsbackexpress.adaptable.app/tasks/${id}`, {
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
      await fetch(`https://mcsbackexpress.adaptable.app/tasks/${id}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleAddTask = () => {
    navigate('/form');
  };

  return (
    <div className="task-list-container">
      <div className="header">
        <h1>Task Management</h1>
        <button className="add-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <Item
            key={task._id}
            task={task}
            handleStatusUpdate={handleStatusUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
