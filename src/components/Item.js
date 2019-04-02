import React, { PureComponent } from 'react';

class Item extends PureComponent {
  render() {
    const {
      todo,
      itemOnClick,
      deleteOnClick,
      onDragStart,
      onDragOver
    } = this.props;
    return (
      <li className='todo-app__item' onDragOver={e => onDragOver(e, todo.id)}>
        <div className='todo-app__checkbox'>
          <input
            type='checkbox'
            checked={todo.completed}
            id={todo.id}
            onChange={itemOnClick}
          />
          <label htmlFor={todo.id} />
        </div>
        <h1
          className='todo-app__item-detail '
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.item}
        </h1>
        <div
          className='todo-app__item-delete'
          onClick={e => deleteOnClick(todo.id)}
        >
          <i className='fas fa-trash-alt' />
        </div>
        <div
          className='todo-app__item-sort'
          draggable
          onDragStart={e => onDragStart(e, todo.id)}
        >
          <i className='fas fa-bars' />
        </div>
      </li>
    );
  }
}

export default Item;
