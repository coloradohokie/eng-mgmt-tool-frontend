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
            task_group: "Main",
            active: true
        }

        if (this.state.taskName !== "") {
            fetch(`http://localhost:3000/task`, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTask)
              })
                .then(response => response.json())
                .then(activity => {this.setState([...this.state.projectActivities, activity])})
            //   window.location.href = `/item-details/${newActivity.project_id}`
        }
    }

    render() {
        return(
            <>
            <input type="text" name="addTask" placeholder="Add a task" onChange={(event) => this.handleChange(event)} />
            <button onClick={this.addTaskHandler}>Add</button>
            </>
        )
    }
}

export default AddTask