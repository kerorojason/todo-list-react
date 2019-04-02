import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
  createList = () => {
    const {
      todoAll,
      filter,
      handleItemOnClick,
      handleDeleteOnclick,
      onDragOver,
      onDragStart
    } = this.props;

    return todoAll
      .filter(todo => {
        if (filter === 'all') {
          return true;
        } else if (filter === 'active') {
          return !todo.completed;
        } else {
          return todo.completed;
        }
      })
      .map(todo => (
        <Item
          key={todo.id}
          todo={todo}
          todoAll={todoAll}
          itemOnClick={handleItemOnClick}
          deleteOnClick={handleDeleteOnclick}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
        />
      ));
  };

  render() {
    return (
      <ul className='todo-app__list' id='todo-list'>
        {this.createList()}
      </ul>
    );
  }
}

export default List;
