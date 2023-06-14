import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const nav = useNavigate();
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleInputChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newTask.title.trim() || !newTask.description.trim()) {
      setErrors({
        title: !newTask.title.trim() ? 'Please enter a title' : '',
        description: !newTask.description.trim()
          ? 'Please enter a description'
          : '',
      });
      return;
    }

    try {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: '', description: '' });
      nav('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleGoBack = () => {
    nav('/');
  };

  return (
    <div className="form-container">
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
      <div className="form-card">
        <h1>Add Task</h1>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleInputChange}
          />
          {errors.title && <p style={{color:"red"}} className="error-message">{errors.title}</p>}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p style={{color:"red"}} className="error-message">{errors.description}</p>
          )}
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
