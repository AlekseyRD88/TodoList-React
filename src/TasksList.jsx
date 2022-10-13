import React, { Component } from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import PropTypes from 'prop-types';
import { createTask, fetchTasksList, updateTask, deleteTask} from './tasksGateway.js';
class TasksList extends Component {
  state = {
    tasks: [],
  };
  componentDidMount() {
    this.fetchTasks();
  }
  fetchTasks = () => {
    fetchTasksList().then(tasksList => 
      this.setState({
        tasks: tasksList,
      }),
    );

  };
  onCreate = text => {
    const newTask = {
      text,
      done: false,
    };
    createTask(newTask)
      .then(() => this.fetchTasks());
  };

  handleTaskStatusChange = (id) => {
    const { done, text } = this.state.tasks.find(task => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };
    updateTask(id, updatedTask)
      .then(() => this.fetchTasks());
  };

  handleTaskDelete = (id) => {
    deleteTask(id)
      .then(() => this.fetchTasks());
    // const updatedTasks = this.state.tasks.filter(task => task.id !== id);
    // this.setState({ tasks: updatedTasks});
  };
  render() {
    const sortedList = this.state.tasks
        .slice()
        .sort((a, b) => a.done - b.done);
    return(
      <main className="todo-list">
        <CreateTaskInput onCreate={this.onCreate}/>
        <ul className="list">
        {sortedList.map(task => (
          <Task key={task.id} {...task} 
          onDelete={this.handleTaskDelete}
          onChange={this.handleTaskStatusChange} />
        ))}  
      </ul>
      </main>
      
    );
  }
};
TasksList.propTypes = {
  text: PropTypes.string,
  done: PropTypes.bool,
}

TasksList.defaultProps = {
  text: '',
  done: false,
}

export default TasksList;