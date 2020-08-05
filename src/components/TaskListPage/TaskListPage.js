import React, { Component } from 'react';
import TallyhoApiService from '../../services/tallyho-api-service';
import TaskItem from '../TaskListItem/TaskListItem';
import EditModePage from '../EditModePage/EditModePage';
import './TaskListPage.css';

export default class TaskListPage extends Component {
  componentDidMount() {
    TallyhoApiService.getTasks()
      .then(response => {
        this.props.renderTasks(response);
      })
      .catch(error => {
        console.error({ error });
      });
  }

  renderTasks() {
    const tasks = this.props.tasks;

    if (this.props.editModeOn) {
      return tasks.map(task => (
        <EditModePage
          key={task.id}
          task={task}
          saveTaskSucess={this.props.saveTaskSucess}
        />
      ));
    }

    if (tasks.length > 0) {
      return tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleDeleteTask={this.props.handleDeleteTask}
          handleClickToggle={this.props.handleClickToggle}
        />
      ));
    }
  }

  render() {
    return <section className='task-list-page'>{this.renderTasks()}</section>;
  }
}
