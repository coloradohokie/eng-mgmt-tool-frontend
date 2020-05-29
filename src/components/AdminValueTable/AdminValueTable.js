import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import classes from './AdminValueTable.module.css'
import AdminDisplayValue from './AdminDisplayValue/AdminDisplayValue'


const adminValueTable = (props) => {


    const printTask = (task) => (
        <tr>
            <td>{task.name}</td>
            <td>{task.sort_id}</td>
            <td>{task.active}</td>
        </tr>
    )

    const showTasks = (category_id) => {
        return(props.tasks.map(task => 
            (task.task_category_id === category_id) ? printTask(task) : null
        ))
    }

    const renderTable = (values) => {
        return values.map(category => <AdminDisplayValue {...category} />)
    }

    return(
        <div>
            <div className={classes.AdminTableHeader}>
                <h2>{props.title}</h2>
                <Button size='sm' variant="secondary">Add Value</Button>
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
                    {renderTable(props.values)}
                </tbody>
            </Table>
        </div>
    )
}

export default adminValueTable