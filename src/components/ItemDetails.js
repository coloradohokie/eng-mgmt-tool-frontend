import React from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import TaskItem from './TaskItem'
import ActivityItem from './ActivityItem'
import Moment from 'react-moment'




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

    
    
    const renderProjectInformationRow = (name, value, clas) => {
        if (clas === 'date-field' && value) {
            return (
                <tr>
                <td>{name}</td>
                <td className={clas}><Moment format="MM-DD-YYYY">{value}</Moment></td>
            </tr>
            )
        }
        return(
            <tr>
                <td>{name}</td>
                <td className={clas}>{value}</td>
            </tr>
        )
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
            const projectInfo = {
                budget, 
                contract_date, 
                st_contract_received_date, 
                trusses_received_date,
                framing_due_date, 
                foundation_due_date,
                email_from_dwg_received_date,
                contract_proposal_sent_date
            }


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
                    <div className="item-details-tasks-section">
                        <div className="item-details-tasks-section-header">                            
                                <h2>Project Information 
                                    <a href={`../create-new-project`}>
                                        <Badge variant="secondary">Edit</Badge>
                                    </a>
                                </h2>
                        </div>
                        <div className="item-details-task-section-body">
                            <Table striped bordered hover size="sm" className="item-details-table">
                                <tbody>
                                    {renderProjectInformationRow("Budget",budget,"text-field")}
                                    {renderProjectInformationRow("Contract Date",contract_date,"date-field")}
                                    {renderProjectInformationRow("ST Contract Received",st_contract_received_date,"date-field")}
                                    {renderProjectInformationRow("Trusses Received",trusses_received_date,"date-field")}
                                    {renderProjectInformationRow("Framing Due",framing_due_date,"date-field")}
                                    {renderProjectInformationRow("Foundation Due",foundation_due_date,"date-field")}
                                    {renderProjectInformationRow("Contract Date",contract_date,"date-field")}
                                    {renderProjectInformationRow("Email from DWG Received",email_from_dwg_received_date,"date-field")}
                                    {renderProjectInformationRow("Ready to be Invoiced Date",ready_to_be_invoiced_date,"date-field")}
                                </tbody>
                            </Table>
                        </div>
                    </div>

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
                        <p>Project Created: {<Moment format="MM-DD-YYYY">{created_at}</Moment>}</p>
                        <p>Last Updated: <Moment format="MM-DD-YYYY">{updated_at}</Moment></p>
                    </div>
                </footer>
            </div>
        )
    }
    else return <></>
}
