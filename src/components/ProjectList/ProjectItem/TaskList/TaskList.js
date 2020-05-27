import React, { Component } from 'react'
import AddTask from './AddTask/AddTask'
import TaskItem from './TaskItem/TaskItem'
import Table from 'react-bootstrap/Table'
import classes from './TaskList.module.css'

class TaskList extends Component {
    
    showTask = (project_id, task) => ( 
        <TaskItem 
            key={task.id} 
            project_id={project_id}
            {...task} 
            toggleTaskCompleted={this.props.toggleTaskCompleted}
        /> 
    )

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
                    <AddTask 
                        group={this.props.group} 
                        project_id={this.props.project_id} 
                        addTaskToProject={this.props.addTaskToProject} />
                </tbody>
            </Table>
        )
    }
}

export default TaskList