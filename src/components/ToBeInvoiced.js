import React from 'react'
import Table from 'react-bootstrap/Table'

export default function ToBeInvoiced(props) {
    
   
    return (
        <div>
            <h1>Projects to be Invoiced</h1>

            <Table striped hover bordered className="adminValueTable">
                <thead>
                    <tr>
                        <td>Job #</td>
                        <td>Address</td>
                    </tr>
                </thead>

                <tbody>
                    {props.projects.map(project => {
                        if (project.ready_to_be_invoiced && project.status !== "Closed") {

                            return(
                                <tr>
                                    <td>{project.job_number}</td>
                                    <td>{project.address1} {project.address2} {project.city} </td>
                                </tr>
                            )
                        }
                        else {return null}
                    })}
                </tbody>
            </Table>
        </div>
    )
}
