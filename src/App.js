import React, { useState } from 'react';

const initialTodos = [
  {
    id: '1',
    task: 'learn react',
    complete: false
  },
  {
    id: '2',
    task: 'learn graphQL',
    complete: false
  },
  {
    id: '3',
    task: 'learn AWS',
    complete: false
  },
  {
    id: '4',
    task: 'learn Something',
    complete: false
  },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState('');

  const handleInputChange = evt => {
    setTask(evt.target.value);
  };

  const handleCompleteChange = id => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }

        return todo;
      })
    )
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (task) {
      //add new todo item
      if(task) {
        // unique id, with 
        const id = todos && todos[todos.length - 1] 
          ? parseInt(todos[todos.length - 1]) + 1 + ''
          : '1';
        
        setTodos(todos.concat({
          id,
          task,
          complete: false
        }))
      }
    }

    setTask('');
  };

  return (
    <div className="App">
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleCompleteChange(todo.id)}
                />
              </label>
              <label>{todo.task}</label>
            </li>
          ))
        }
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
