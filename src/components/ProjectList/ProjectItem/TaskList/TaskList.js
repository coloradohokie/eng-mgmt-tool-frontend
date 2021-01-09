import React, { Component } from 'react'
import TaskItem from './TaskItem/TaskItem'
import Table from 'react-bootstrap/Table'
import classes from './TaskList.module.scss'

class TaskList extends Component {
//props: tasks, group, project_id, addTaskToProject(), toggleTaskCompleted()

    state = {
        newTask: ""
    }

    showTask = (project_id, task) => {
        if (!task.id) {
            task.id = 1000
        }
        return( 
            <TaskItem 
                key={task.id} 
                project_id={project_id}
                {...task} 
                toggleTaskCompleted={this.props.toggleTaskCompleted}
            /> 
        )
    }

    handleChange(event) {
        this.setState({newTask: event.target.value})
    }

    handleEnter = (event) => {
        if (event.key === "Enter" && this.state.newTask !== "") {
            this.props.addTaskToProject(this.state.newTask, this.props.project_id, this.props.group)
            this.setState({newTask: ""})
        }
    }



    render() {
        return(
            <Table hover size="sm" className={classes.ItemDetailsTable}>
                <tbody>
                    {this.props.tasks.map(task => {
                        if (task.template_name === this.props.group) {
                            return this.showTask(this.props.project_id, task)
                        }
                        return null
                    })}
                    <tr>
                        <td colSpan="2">
                            <input 
                                type="text" 
                                name="addTask" 
                                value={this.state.newTask} 
                                placeholder="Add a task"
                                onKeyPress={this.handleEnter} 
                                onChange={(event) => this.handleChange(event)} />
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default TaskList