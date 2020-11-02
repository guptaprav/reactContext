import React, { useContext } from 'react';
import { FilterContext } from '../App';

const Filter = () => {
  const dispatch = useContext(FilterContext);
  
  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' });
  };

  const handleShowCompleted = () => {
    dispatch({ type: 'SHOW_COMPLETED' });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' })
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>Show All</button>
      <button type="button" onClick={handleShowCompleted}>Show Completed</button>
      <button type="button" onClick={handleShowIncomplete}>Show Incomplete</button>
    </div>
  );
};

export default Filter;
