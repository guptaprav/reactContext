import React, { useState } from 'react';

const AddTodo = ({ dispatch, todos }) => {
  const [task, setTask] = useState('');

  const handleInputChange = evt => {
    setTask(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (task) {
    //add new todo item
    // unique id, with 
    const id = todos && todos[todos.length - 1] 
      ? parseInt(todos[todos.length - 1].id) + 1 + ''
      : '1';
      dispatch({
        type: 'ADD_TODO',
        payload: { id, task }
      })
    }

    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={task}
      onChange={handleInputChange}
    />
    <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
