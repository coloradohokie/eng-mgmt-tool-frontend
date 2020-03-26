import React from 'react'
import AdminDisplayValue from './AdminDisplayValue'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


export default function Admin(props) {
    console.log(props)

    const renderTable = (values) => {
        return values.map(category => <AdminDisplayValue {...category} />)

    }

    return (
        <div>
            <h1>This is the Admin Page</h1>

            <div className="adminTableHeader">
                <h2>Task Categories</h2>
                <Button size='sm' variant="secondary">Add Value</Button>
            </div>
            <Table striped bordered size="sm" className="adminValueTable">
                <thead>
                    <tr>
                        <td>Value</td>
                        <td>Sort Order</td>
                        <td>Active</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props.taskCategories)}
                </tbody>
            </Table>


            <div className="adminTableHeader">
                <h2>Status Categories</h2>
                <Button size='sm' variant="secondary">Add Value</Button>
            </div>
            <Table striped bordered size="sm" className="adminValueTable">
                <thead>
                    <tr>
                        <td>Value</td>
                        <td>Sort Order</td>
                        <td>Active</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props.statusValues)}
                </tbody>
            </Table>


        </div>
    )
}
