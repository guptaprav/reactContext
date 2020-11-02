import React, { useState, useReducer } from 'react';
import Filter from './components/Filter';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

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
  });
  
  return (
    <div className="App">
      <Filter dispatch={dispatchFilter} />
      <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddTodo dispatch={dispatchTodos} todos={todos} />
    </div>
  );
}

export default App;
