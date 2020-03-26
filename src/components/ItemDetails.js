import React from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import TaskItem from './TaskItem'
import ActivityItem from './ActivityItem'



export default function ItemDetails(props) {
    const showTask = (task) => {
        // console.log(task)
        return( <TaskItem key={task.id} {...task} /> )
    }

    const showActivities = (id) => { 
        return (
            props.activities.map(activity => activity.project_id === id ? 
                 <ActivityItem key={activity.id} activity={activity} /> : null
            )                
        )
    }
    
    const showInvoiceBadge = (ready_to_be_invoiced) => {
        if (ready_to_be_invoiced) {
            return <h3><Badge variant="secondary">Ready to Be Invoiced</Badge></h3>
        }
    }

    const displayTaskCategoryTable = (category_id, tasks) => {
        console.log(props.taskCategories)
        const selectedCategory = props.taskCategories.find(cat => cat.id === category_id)
        return (
            <div>
                <h2>{selectedCategory.value}</h2>
                <Table hover size="sm" className="item-details-table">
                    <tbody>
                        {tasks.map(task => task.task_category_id === category_id ? showTask(task):null)}
                    </tbody>
                </Table>
            </div>
        )
    }

    const displayTaskTables = (tasks) => {
        const categories = [...new Set(tasks.map(task => task.task_category_id ))]
        return categories.map(category => displayTaskCategoryTable(category, tasks))
    }
    
    const project = props.projects.find(element => element.id === parseInt(props.match.params.id))
    if (project) {
        const {
            id,
            job_number, 
            address1, 
            address2,
            city,
            project_description,
            budget,
            contract_date,
            st_contract_received_date,
            trusses_received_date,
            framing_due_date,
            foundation_due_date,
            email_from_dwg_received_date,
            contract_proposal_sent_date,
            ready_to_be_invoiced,
            ready_to_be_invoiced_date,
            created_at,
            updated_at,
            tasks} = (project)

            console.log(props.projectTasks)
            
            
            
            return (
            <div className="item-details">
                <div className="item-details-header">
                    <div className="item-details-header-top-line">
                        <div>
                            <h1 className="item-details-h1">{address1} {address2} {city} -- {job_number} </h1>
                        </div>
                        <div>
                            {showInvoiceBadge(ready_to_be_invoiced)}    
                        </div>
                    </div>

                    <p>{project_description}</p>
                    
                </div>

                <div className="item-details-body">
                    <h2>Project Information</h2>
                    <Table striped bordered hover size="sm" className="item-details-table">
                        <tbody>
                            <tr>
                                <td>Budget</td>
                                <td>${budget}</td>
                            </tr>

                            <tr>
                                <td>Contract Date</td>
                                <td>{contract_date}</td>
                            </tr>

                            <tr>
                                <td>ST Contract Received</td>
                                <td>{st_contract_received_date}</td>
                            </tr>

                            <tr>
                                <td>Trusses Received</td>
                                <td>{trusses_received_date}</td>
                            </tr>
                            
                            <tr>
                                <td>Framing Due</td>
                                <td>{framing_due_date}</td>
                            </tr>
                            
                            <tr>
                                <td>Foundation Due</td>
                                <td>{foundation_due_date}</td>
                            </tr>
                            
                            <tr>
                                <td>Email from DWG Received</td>
                                <td>{email_from_dwg_received_date}</td>
                            </tr>
                            
                            <tr>
                                <td>Contract Proposal Sent</td>
                                <td>{contract_proposal_sent_date}</td>
                            </tr>

                            <tr>
                                <td>Ready to be Invoiced Date</td>
                                <td>{ready_to_be_invoiced_date}</td>
                            </tr>

                        </tbody>
                    </Table>
                    
                    {displayTaskTables(tasks)}


                    

                    <div className="item-details-section">
                        <div className="item-details-section-header">
                            <h2>Activity Log </h2>
                            <h3><Badge variant="secondary">Add Activity</Badge></h3>
                            
                        </div>

                        <div className="item-details-section-body">
                            <Table striped bordered hover size="sm" className="activity-log-table">
                                <thead>
                                    <tr>
                                        <th>Activity</th>
                                        <th>Date</th>
                                        <th>Project</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {showActivities(id)}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>


                <footer className="item-details-footer">
                    <div>
                        <p><a href="/"> &lt;- Back to Project List</a></p>
                    </div>
                    <div>
                        <p>Project Created: {created_at}</p>
                        <p>Last Updated: {updated_at}</p>
                    </div>
                </footer>
            </div>
        )
    }
    else return <></>
}
