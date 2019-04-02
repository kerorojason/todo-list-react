import React from 'react';

export default ({ onKeyPress, onChange, queryInput }) => {
  return (
    <input
      type='text'
      className='todo-app__input'
      id='todo-input'
      placeholder='What needs to be done?'
      value={queryInput}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  );
};
