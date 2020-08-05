import React, { Component } from 'react';
import TallyhoApiService from '../../services/tallyho-api-service';
import './TaskForm.css';

export default class TaskForm extends Component {
  state = {
    taskTitle: { value: '', touched: false },
    taskImage: { value: '', touched: false },
  };

  setTaskTitle = taskTitle => {
    this.setState({ taskTitle: { value: taskTitle, touched: true } });
  };

  setTaskImage = taskImage => {
    this.setState({ taskImage: { value: taskImage, touched: true } });
  };

  validateTaskTitle = () => {
    let taskTitle = this.state.taskTitle.value.trim();
    if (taskTitle === 0) {
      return 'Task Title is required';
    } else if (taskTitle.length < 1 || taskTitle.length > 30) {
      return 'Task Title must between 1 and 30 characters long';
    }
  };

  validateTaskImage = () => {
    let taskImage = this.state.taskImage.value.trim();
    if (taskImage === 0) {
      return 'Task Image is required';
    } else if (taskImage.length < 6) {
      return 'Task Image must larger than 6 characters';
    } else if (!taskImage.includes('https://')) {
      return `Task Image must be a Url starting with 'https://'`;
    }
  };

  handleTaskSubmit = event => {
    event.preventDefault();
    let taskTitle = this.state.taskTitle.value.trim();
    let taskImage = this.state.taskImage.value;

    TallyhoApiService.postTask(taskTitle, taskImage)
      .then(res => {
        this.props.addTaskSuccess();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <div className='task-form-page'>
        <h1 className='task-form-title'>Create Task</h1>
        <form className='task-form' onSubmit={this.handleTaskSubmit}>
          <label htmlFor='task-title'>
            Add Title
            {this.state.taskTitle.touched && (
              <p className='error'>{this.validateTaskTitle()}</p>
            )}
          </label>
          <input
            required
            className='task-title'
            type='text'
            value={this.state.taskTitle.value}
            onChange={e => this.setTaskTitle(e.target.value)}
          />

          <label htmlFor='task-image'>
            Add Image (Must be an Image address URL)
            {this.state.taskImage.touched && (
              <p className='error'>{this.validateTaskImage()}</p>
            )}
          </label>
          <input
            required
            className='task-image'
            type='text'
            value={this.state.taskImage.value}
            onChange={e => this.setTaskImage(e.target.value)}
          />

          <button
            className='add-button'
            disabled={this.validateTaskTitle() || this.validateTaskImage()}
          >
            Add Task
          </button>
        </form>
      </div>
    );
  }
}
