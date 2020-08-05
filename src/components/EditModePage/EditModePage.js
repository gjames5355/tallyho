import React, { Component } from 'react'
import TallyhoApiService from '../../services/tallyho-api-service'
import './EditModePage.css'

export default class EditForm extends Component {
    constructor(props) {
        super(props)
        this.setTaskTitle = this.setTaskTitle.bind(this);
    }

    state = {
        taskTitle: { value: this.props.task.title, touched: false },
        taskImage: { value: this.props.task.image, touched: false },
        toggleSave: false
    }

    setTaskTitle = taskTitle => {
        this.setState({ taskTitle: { value: taskTitle, touched: true } });
    }

    setTaskImage = taskImage => {
        this.setState({ taskImage: { value: taskImage, touched: true } });
    }

    validateTaskTitle = () => {
        let taskTitle = this.state.taskTitle.value.trim();
        if (taskTitle === 0) {
            return "Task Title is required"
        }
        else if (taskTitle.length < 1 || taskTitle.length > 30) {
            return "Task Title must between 1 and 30 characters long"
        }
    }

    validateTaskImage = () => {
        let taskImage = this.state.taskImage.value.trim();
        if (taskImage === 0) {
            return "Task Image is required"
        }
        else if (taskImage.length < 6) {
            return "Task Image must larger than 6 characters"
        }
        else if (!taskImage.includes('https://')) {
            return `Task Image must be a Url starting with 'https://'`
        }
    }

    handleTaskSave = (event) => {
        event.preventDefault();
        let taskTitle = this.state.taskTitle.value.trim();
        let taskImage = this.state.taskImage.value;

        let newTask = {
            id: this.props.task.id,
            title: taskTitle,
            image: taskImage
        }

        TallyhoApiService.updateTask(newTask, this.props.task.id)
            .then(() => {
                this.props.saveTaskSucess();
                this.setState({
                    toggleSave: true
                })
            })
            .catch(error => {
                console.error({ error });
            })
    }

    toggleSave = () => {
        let isSaved;

        if(this.state.toggleSave) {
            isSaved = "toggle-saved"
        }
        
        else{
            isSaved= "toggle-save"
        }

        return isSaved

    }

    changeSaveText = () => {
        let save;

        if(this.state.toggleSave) {
            save = "Saved!"
        }
        
        else{
            save= "Save"
        }

        return save
    }

    render() {
        return (
            <div className="edit-form-container">
                <form className="task-form edit-form" onSubmit={this.handleTaskSave}>
                    <label htmlFor="task-title">Edit Title
                        {this.state.taskTitle.touched && <p className="error">{this.validateTaskTitle()}</p>}
                    </label>
                    <input className="edit-input" type="text" value={this.state.taskTitle.value} onChange={(e) => {
    
                        this.setTaskTitle(e.currentTarget.value);
                    }} />
                    <label htmlFor="task-image">Edit Image (Must be an Image address URL)
                        {this.state.taskImage.touched && <p className="error">{this.validateTaskImage()}</p>}
                    </label>
                    <input className="edit-input" type="text" value={this.state.taskImage.value} onChange={e => this.setTaskImage(e.target.value)} />
                    <button className={this.toggleSave()} disabled={
                        this.validateTaskTitle() ||
                        this.validateTaskImage()
                    }>{this.changeSaveText()} </button>
                </form>
            </div>
        )
    }

}