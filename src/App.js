import React, { useState, useReducer } from 'react';

const todoReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, complete: true }
        }

        return todo;
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, complete: false }
        }

        return todo;
      });
    case 'ADD_TODO':
      return state.concat({
        id: payload.id,
        task: payload.task,
        complete: false
      });
    default:
      return state;
  }
}
const filterReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETED':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

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
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [task, setTask] = useState('');

  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' });
  };

  const handleShowCompleted = () => {
    dispatchFilter({ type: 'SHOW_COMPLETED' });
  };

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' })
  };

  const filteredTodos = todos.filter(todo => {
    if(filter === 'ALL') {
      return true;
    }
    if(filter === 'COMPLETE' && todo.complete) {
      return true;
    }
    if(filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }

    return false;
  })
  const handleInputChange = evt => {
    setTask(evt.target.value);
  };

  const handleCompleteChange = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      payload: todo
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (task) {
      //add new todo item
      // unique id, with 
      const id = todos && todos[todos.length - 1] 
        ? parseInt(todos[todos.length - 1].id) + 1 + ''
        : '1';
      dispatchTodos({
        type: 'ADD_TODO',
        payload: { id, task }
      })
    }

    setTask('');
  };

  return (
    <div className="App">
      <div>
        <button type="button" onClick={handleShowAll}>Show All</button>
        <button type="button" onClick={handleShowCompleted}>Show Completed</button>
        <button type="button" onClick={handleShowIncomplete}>Show Incomplete</button>
      </div>
      <ul>
        {
          filteredTodos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleCompleteChange(todo)}
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
