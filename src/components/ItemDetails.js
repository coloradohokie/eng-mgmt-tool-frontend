import React from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import TaskItem from './TaskItem'
import ActivityItem from './ActivityItem'



export default function ItemDetails(props) {
    console.log("Item Details Props", props)

    const showTask = (filteredTask) => {
        console.log("showTask: ", filteredTask)
        return( 
            <TaskItem 
                key={filteredTask.id} 
                {...filteredTask} 
                toggleTaskCompleted={props.toggleTaskCompleted}
            /> 
        )
    }

    const showTasksInCategory = (project_id, category) => {
        const filteredList = props.projectTasks.filter(projectTask => 
            (projectTask.project_id === project_id) &&
            (projectTask.task.task_category_id === category.id)
        )
        if (filteredList.length > 0) {
            return ( 
                <div>
                    <h2>{category.value}</h2>
                    <Table hover size="sm" className="item-details-table">
                        <tbody>
                            {filteredList.map(projectTask => showTask(projectTask))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    const getTaskCategory = (project_id) => {
        console.log(props.taskCategories)
        return props.taskCategories.map(category => {
            if (category.active) {
                return showTasksInCategory(project_id, category)
            }
            // else {
            //     console.log(category.value, "is NOT active")
            //     return <></>
            // }
        })

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
            updated_at} = (project)

            const addActivityUrl = `../add-activity/${project.id}`
            
            
            return (
            <div className="item-details">
                <div className="item-details-header">
                    <div className="item-details-header-top-line">
                        <div>
                            <h1 className="item-details-h1">{address1} {address2} {city} &mdash; {job_number} </h1>
                        </div>
                        <div>
                            {showInvoiceBadge(ready_to_be_invoiced)}    
                        </div>
                    </div>

                    <p>{project_description}</p>
                    
                </div>

                <div className="item-details-body">


{/* Project Information Section */}
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
                    

{/* Tasks Section                     */}
                    <div className="item-details-tasks-section">
                        <div className="item-details-tasks-section-header">
                            <h2>Tasks</h2>
                        </div>

                        <div className="item-details-task-section-body">
                            {getTaskCategory(project.id)}
                        </div>

                    </div>



{/* Activity Table                     */}
                    <div className="item-details-section">
                        <div className="item-details-section-header">
                            <h2>Activity Log </h2>
                            <h3>
                                <a href={addActivityUrl}>
                                    <Badge variant="secondary">Add Activity</Badge>
                                </a>
                            </h3>
                            
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
