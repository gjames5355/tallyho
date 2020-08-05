import React, { Component } from 'react';
import TallyhoApiService from '../../services/tallyho-api-service';
import checkmark from '../../img/kisspng-check-mark-checkbox-computer-icons-resort-green-tick-icon-5ab0e1fcefaf89.1310283315215416289818.png';
import './TaskListItem.css';

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleClickDelete = () => {
    const taskId = this.props.task.id;

    TallyhoApiService.getTaskToDelete(taskId)
      .then(() => {
        this.props.handleDeleteTask(taskId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  changeImage = () => {
    let imageUrl;

    if (this.props.task.checked) {
      imageUrl = checkmark;
    } else {
      imageUrl = this.props.task.image;
    }

    return imageUrl;
  };

  changeImageClass = () => {
    let imageClass;

    if (this.props.task.checked) {
      imageClass = 'task-image-checked';
    } else {
      imageClass = 'task-image';
    }

    return imageClass;
  };

  render() {
    return (
      <section className='task-item'>
        <h3 className='task-title'>{this.props.task.title}</h3>
        <img
          className={this.changeImageClass()}
          onClick={() => this.props.handleClickToggle(this.props.task)}
          src={this.changeImage()}
          alt={`task of ${this.props.task.image}`}
        />
        <div className='task-delete' onClick={() => this.handleClickDelete()}>
          <i className='fas fa-trash-alt fa-lg'></i>
        </div>
      </section>
    );
  }
}
