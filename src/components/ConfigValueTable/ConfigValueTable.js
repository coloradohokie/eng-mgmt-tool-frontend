import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import classes from './ConfigValueTable.module.scss'
import ConfigDisplayValue from './ConfigDisplayValue/ConfigDisplayValue'

class ConfigValueTable extends Component {
    state = {
        addNewValue: false,
        value: "",
        sort_id: 99,
        disabled: true
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
        return values.map(value => <ConfigDisplayValue key={value.id} {...value} />)
    }

    addValueInputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            disabled: event.target.value.length <= 0
        })
    }

    submitNewValue = () => {
        if (!this.state.value || !this.state.sort_id) throw new Error('Fields cannot be blank')
        const newValue = {
            value: this.state.value,
            sort_id: this.state.sort_id,
            active: true
        }
        this.props.updateValues(this.props.title, newValue)
        this.setState({
            addNewValue: false,
            value: "",
            sort_id: 99,
            disabled: true
        })
        
    }

    addNewValue = () => {
        if (!this.state.addNewValue) return 
        return(
            <>
                <tr>
                    <td> <input name="value" type="text" value={this.state.value} onChange={this.addValueInputHandler} placeholder="Name" /> </td>
                    <td> <input name="sort_id" value={this.state.sort_id} onChange={this.addValueInputHandler} type="number" /> </td>
                    <td> Yes </td>
                </tr>
                <tr>
                    <td colSpan="3"><button disabled={this.state.disabled} onClick={() => this.submitNewValue()}>Add</button></td>
                </tr>
            </>
        )
    }
    
    addValueClicked = () => {
        this.setState({addNewValue: true})
    }

    render() {
        return(
            <div className={classes.ConfigValueTable}>
                <div className={classes.ConfigValueTableHeader}>
                    <h2>{this.props.title}</h2>
                    <div className={classes.AddValueButton}>
                        <Button size='sm' variant="secondary" onClick={() => this.addValueClicked()}>Add Value</Button>
                    </div>
                </div>
                <Table striped bordered size="sm">
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

export default ConfigValueTable