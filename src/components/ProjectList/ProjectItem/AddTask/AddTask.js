import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'


class AddTask extends Component {
    state={
        taskName: ""
    }

    handleChange(event) {
        this.setState({taskName: event.target.value})
    }

    addTaskHandler = () => {
        const newTask = {
            name: this.state.taskName,
            task_group: this.props.group,
            active: true
        }

        if (this.state.taskName !== "") {
            this.props.addTaskToProject(this.props.project_id, this.props.group, this.state.taskName)
        }
    }

    render() {
        console.log("Add Task", this.props)
        return(
            <tr>
                <td colSpan="2">
                    <input type="text" name="addTask" placeholder="Add a task" onChange={(event) => this.handleChange(event)} />
                    <button onClick={this.addTaskHandler}>Add</button>
                </td>
            </tr>
        )
    }
}

export default AddTask