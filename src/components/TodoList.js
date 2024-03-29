import React, { useContext } from 'react';
import { TodoContext } from '../App';

const TodoList = ({ todos }) => {
  const dispatch = useContext(TodoContext);

  const handleCompleteChange = todo => {
    dispatch({
    type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
    payload: todo
    });
  };

  return (
    <ul>
      {
        todos.map(todo => (
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
  );
};

export default TodoList;
