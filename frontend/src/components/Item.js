import React from 'react';

const Item = ({ task, handleStatusUpdate, handleDelete }) => {
  return (
    <div key={task._id} className="task-item">
      <h3>Title: {task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Status: {task.status}</p>
      {task.status !== 'Completed' && (
        <button
          onClick={() => handleStatusUpdate(task._id, 'Completed')}
          className="status-button"
        >
          Mark as Completed
        </button>
      )}
      <button onClick={() => handleDelete(task._id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default Item;
