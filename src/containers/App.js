import React, { Component } from 'react';
import { v4 } from 'uuid';
import '../styles.css';

import Header from '../components/Header';
import Input from '../components/Input';
import List from '../components/List';
import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoAll: [
        {
          item: 'todo-1',
          completed: false,
          id: 'a6af7ab0-3a6c-4391-9685-a7e99200afde'
        },
        {
          item: 'todo-2',
          completed: true,
          id: 'e9e93c14-bb2f-47ff-81ff-4cc20e6f6ce1'
        }
      ],
      filter: 'all',
      left: 1
    };
  }

  handleInputChange = e => {
    this.setState({ queryInput: e.target.value });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.setState(state => {
        const newItem = {
          item: this.state.queryInput,
          completed: false,
          id: v4()
        };
        console.log(newItem);
        return {
          queryInput: '',
          todoAll: [newItem, ...state.todoAll],
          left: state.left + 1
        };
      });
    }
  };

  handleItemOnClick = e => {
    const targetId = e.target.id;
    this.setState(state => {
      const newTodoAll = state.todoAll.map(todo => {
        if (todo.id === targetId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
      return {
        todoAll: newTodoAll,
        left: newTodoAll.reduce((sum, cur) => {
          if (!cur.completed) return ++sum;
          else {
            return sum;
          }
        }, 0)
      };
    });
  };

  handleChangeState = filter => {
    this.setState({ filter: filter });
  };

  handleDeleteOnclick = id => {
    this.setState(state => {
      const newTodoAll = state.todoAll.filter(todo => todo.id !== id);
      return {
        todoAll: newTodoAll,
        left: newTodoAll.reduce((sum, cur) => {
          if (!cur.completed) return ++sum;
          else {
            return sum;
          }
        }, 0)
      };
    });
  };

  handleClearClick = () => {
    this.setState(state => {
      return {
        todoAll: state.todoAll.filter(todo => !todo.completed)
      };
    });
  };

  onDragStart = (e, id) => {
    this.draggedId = id;
    this.draggedItem = this.state.todoAll.find(
      todo => todo.id === this.draggedId
    );
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 650, 20);
  };

  onDragOver = (e, draggedOverId) => {
    const draggedOverItem = this.state.todoAll.find(
      todo => todo.id === draggedOverId
    );
    if (this.draggedItem === draggedOverItem) {
      return;
    }
    const draggedOverIndex = this.state.todoAll.findIndex(
      todo => todo.id === draggedOverId
    );
    this.setState(state => {
      console.log(this.draggedItem.item, draggedOverItem.item);
      console.log(this.draggedItem.id, this.draggedId);
      const newTodoAll = state.todoAll.filter(
        todo => todo.id !== this.draggedId
      );
      newTodoAll.splice(draggedOverIndex, 0, this.draggedItem);
      return {
        todoAll: newTodoAll
      };
    });
  };

  render() {
    return (
      <div id='root' className='todo-app__root'>
        <Header />
        <section className='todo-app__main'>
          <Input
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
            queryInput={this.state.queryInput}
          />
          <List
            todoAll={this.state.todoAll}
            filter={this.state.filter}
            handleItemOnClick={this.handleItemOnClick}
            handleDeleteOnclick={this.handleDeleteOnclick}
            onDragEnd={this.onDragEnd}
            onDragOver={this.onDragOver}
            onDragStart={this.onDragStart}
          />
        </section>
        <Footer
          left={this.state.left}
          onChangeState={this.handleChangeState}
          onClearClick={this.handleClearClick}
        />
      </div>
    );
  }
}

export default App;
