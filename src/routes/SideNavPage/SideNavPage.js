import React, { Component } from 'react';
import './SideNavPage.css';

export default class SideNavPage extends Component {
  render() {
    let renderSideNav;

    if (this.props.editModeOn) {
      renderSideNav = (
        <div className='side-page-nav'>
          <button
            onClick={this.props.setEditMode}
            className='back-button side-button'
          >
            Back
          </button>
        </div>
      );
    } else if (this.props.addModeOn) {
      renderSideNav = (
        <div className='side-page-nav'>
          <button
            onClick={this.props.setAddMode}
            className='back-button side-button'
          >
            Back
          </button>
        </div>
      );
    } else {
      renderSideNav = (
        <div className='side-page-nav'>
          <button
            onClick={this.props.setAddMode}
            className='add-task-link side-button'
          >
            Add
          </button>
          <button
            onClick={this.props.setEditMode}
            className='edit-task-link side-button'
          >
            Edit
          </button>
        </div>
      );
    }
    return <div>{renderSideNav}</div>;
  }
}
