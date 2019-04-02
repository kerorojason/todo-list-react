import React, { Component } from 'react';

export default ({ left, onChangeState, onClearClick }) => {
  return (
    <footer className='todo-app__footer' id='todo-footer'>
      <div className='todo-app__total'>{left} left</div>
      <ul className='todo-app__view-buttons'>
        <button id='filter-all' onClick={onChangeState.bind(this, 'all')}>
          All
        </button>
        <button id='filter-active' onClick={onChangeState.bind(this, 'active')}>
          Active
        </button>
        <button
          id='filter-completed'
          onClick={onChangeState.bind(this, 'completed')}
        >
          Completed
        </button>
      </ul>
      <div className='todo-app__clean' id='clean'>
        <button onClick={onClearClick}>Clear Completed</button>
      </div>
    </footer>
  );
};
