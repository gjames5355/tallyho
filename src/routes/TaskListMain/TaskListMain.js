import React, { Component } from 'react';
import TasklistPage from '../../components/TaskListPage/TaskListPage';
import TokenService from '../../services/token-service';
import { Link } from 'react-router-dom';
import SideNavPage from '../SideNavPage/SideNavPage';
import TaskForm from '../../components/TaskForm/TaskForm';
import TallyhoApiService from '../../services/tallyho-api-service';
import UserContext from '../../contexts/UserContext';
import './TaskListMain.css';

export default class TaskListMain extends Component {
  state = {
    tasks: [],
    editModeOn: false,
    addModeOn: false,
  };

  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderTasks = response => {
    let token = TokenService.getAuthToken();
    let decodedToken = TokenService.decodeToken(token);
    let userId = decodedToken.payload.user_id;
    let userTasks = response.filter(task => task.user_id === userId);

    this.setState({
      tasks: userTasks,
    });
  };

  handleDeleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
    });
  };

  setEditMode = () => {
    this.setState({
      editModeOn: !this.state.editModeOn,
    });
  };

  setAddMode = () => {
    this.setState({
      addModeOn: !this.state.addModeOn,
    });
  };

  addTaskSuccess = () => {
    this.setState({
      editModeOn: false,
      addModeOn: false,
    });
  };

  saveTaskSucess = () => {
    TallyhoApiService.getTasks()
      .then(response => {
        this.renderTasks(response);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  handleClickToggle = task => {
    let newTask = task;
    newTask.checked = !newTask.checked;

    TallyhoApiService.updateTask(newTask, newTask.id)
      .then(() => {
        let updatedTasks = this.state.tasks.map(task => {
          if (task.id === newTask.id) {
            task.checked = newTask.checked;
          }
          return task;
        });
        this.setState({
          tasks: updatedTasks,
        });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    let renderPage;

    if (this.state.addModeOn) {
      renderPage = <TaskForm addTaskSuccess={this.addTaskSuccess} />;
    } else {
      renderPage = (
        <TasklistPage
          renderTasks={this.renderTasks}
          tasks={this.state.tasks}
          handleDeleteTask={this.handleDeleteTask}
          handleClickToggle={this.handleClickToggle}
          editModeOn={this.state.editModeOn}
          addTaskSuccess={this.addTaskSuccess}
          saveTaskSucess={this.saveTaskSucess}
        />
      );
    }

    return (
      <div>
        <nav role='navigation' className='nav-bar'>
          <div className='tallyho-header'>
            <h1>
              <Link to={'/login'} className='tallyho-logo'>
                Tallyho!
              </Link>
            </h1>
          </div>
          <div className='log-button'>
            <Link
              onClick={this.handleLogoutClick}
              className='toggle-log'
              to='/login'
            >
              Logout
            </Link>
          </div>
        </nav>
        <SideNavPage
          editModeOn={this.state.editModeOn}
          setEditMode={this.setEditMode}
          setAddMode={this.setAddMode}
          addModeOn={this.state.addModeOn}
        />
        {renderPage}
      </div>
    );
  }
}
