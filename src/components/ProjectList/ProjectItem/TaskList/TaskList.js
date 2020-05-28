import React, { Component } from 'react'
import TaskItem from './TaskItem/TaskItem'
import Table from 'react-bootstrap/Table'
import classes from './TaskList.module.css'

class TaskList extends Component {
//props: tasks, group, project_id, addTaskToProject(), toggleTaskCompleted()

    state = {
        tasks: this.props.tasks,
        newTask: ""
    }
    
    showTask = (project_id, task) => ( 
        <TaskItem 
            key={task.id} 
            project_id={project_id}
            {...task} 
            toggleTaskCompleted={this.props.toggleTaskCompleted}
        /> 
    )

    handleChange(event) {
        this.setState({newTask: event.target.value})
    }

    addTaskHandler = () => {
        if (this.state.newTask !== "") {
            const tasks = this.state.tasks.push(this.state.newTask)
            this.setState({tasks: tasks, newTask: ""})
            this.props.addTaskToProject(this.props.project_id, this.props.group, this.state.newTask)
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
                            <input type="text" name="addTask" value={this.state.newTask} placeholder="Add a task" onChange={(event) => this.handleChange(event)} />
                            <button onClick={this.addTaskHandler}>Add</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default TaskList