import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import classes from './AdminValueTable.module.css'
import AdminDisplayValue from './AdminDisplayValue/AdminDisplayValue'


class AdminValueTable extends Component {
    
    state = {
        addNewValue: false,
        name: "",
        sort_id: 99
    }


    printTask = (task) => (
        <tr>
            <td>{task.name}</td>
            <td>{task.sort_id}</td>
            <td>{task.active}</td>
        </tr>
    )

    showTasks = (category_id) => {
        return(this.props.tasks.map(task => 
            (task.task_category_id === category_id) ? this.printTask(task) : null
        ))
    }

    renderTable = (values) => {
        return values.map(value => <AdminDisplayValue key={value.id} {...value} />)
    }

    addValueInputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitNewValue = (title) => {
        if (this.state.name && this.state.sort_id) {
            const newValue = {
                name: this.state.name,
                sort_id: this.state.sort_id,
                active: true
            }
            let endpoint = ""
            switch (title) {
                case "Task Templates":
                    endpoint = "task_templates"
                    break
                case "Project Statuses":
                    endpoint = "statuses"
                    break
                case "Activity Values":
                    endpoint = "activities"
                    break
                default:
                    endpoint = ""
            }
            fetch(`http://localhost:3000/`.concat(endpoint), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newValue)
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.props.updateValues(title, response)})
            this.setState({
                addNewValue: false,
                name: "",
                sort_id: 99
            })
        }
    }

    addNewValue = () => {
        if (this.state.addNewValue) {
            return(
                <>
                <tr>
                    <td> <input name="name" type="text" value={this.state.name} onChange={this.addValueInputHandler} placeholder="Name" /> </td>
                    <td> <input name="sort_id" value={this.state.sort_id} onChange={this.addValueInputHandler} type="number" /> </td>
                    <td> Yes </td>
                </tr>
                <tr>
                    <td colSpan="3"><button onClick={() => this.submitNewValue(this.props.title)}>Add</button></td>
                </tr>
                </>
            )
        }
        return null
    }
    
    addValueClicked = (title) => {
        this.setState({addNewValue: true})
    }

    render() {
        return(
            <div>
                <div className={classes.AdminTableHeader}>
                    <h2>{this.props.title}</h2>
                    <Button size='sm' variant="secondary" onClick={() => this.addValueClicked(this.props.title)}>Add Value</Button>
                </div>
                <Table striped bordered size="sm" className={classes.AdminValueTable}>
                    <thead>
                        <tr>
                            <td>Value</td>
                            <td>Sort Order</td>
                            <td>Active</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable(this.props.values)}
                        {this.addNewValue()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AdminValueTable