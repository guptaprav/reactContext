import React, { useState, useReducer, createContext } from 'react';
import Filter from './components/Filter';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

export const FilterContext = createContext(null);
export const TodoContext = createContext(null);

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
    <FilterContext.Provider value={dispatchFilter}>
    <TodoContext.Provider value={dispatchTodos}>
      <div className="App">
        <Filter />
        <TodoList todos={filteredTodos} />
        <AddTodo todos={todos} />
      </div>
    </TodoContext.Provider>
    </FilterContext.Provider>
  );
}

export default App;
