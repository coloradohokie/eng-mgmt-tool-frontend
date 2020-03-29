import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ItemDetails from './ItemDetails'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import CurrencyFormat from 'react-currency-format'
import TaskItem from './TaskItem'
import ActivityItem from './ActivityItem'


const ProjectItem = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const project = {...props.project}
    const detailLink = `/item-details/${project.id}`
    const cardTitleLine = project.city ? 
        <Card.Title onClick={handleShow}> {project.address1}, {project.city} &mdash; {project.job_number} </Card.Title> :
        <Card.Title onClick={handleShow}> {project.address1} &mdash; {project.job_number} </Card.Title>

        // <Card.Title> <a href={detailLink}> {project.address1}, {project.city} &mdash; {project.job_number} </a> </Card.Title> :
        // <Card.Title> <a href={detailLink}> {project.address1} &mdash; {project.job_number} </a> </Card.Title>

    const showTask = (filteredTask) => {
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
        return props.taskCategories.map(category => {
            return category.active ? showTasksInCategory(project_id, category) : <></>
        })

    }
    const showActivities = (id) => {
        props.projectActivities.sort(function (a,b) {return b.id - a.id})
        return (
            props.projectActivities.map(activity => activity.project_id === id ? 
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
        } else if (clas === 'money-field' && value)  {
            return(
                <tr>
                    <td>{name}</td>
                    <td className={clas}>{<CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                </tr>
            )
        } else {
            return(
                <tr>
                    <td>{name}</td>
                    <td className={clas}>{value}</td>
                </tr>
            )
        }
    }

    const addActivityUrl = `../add-activity/${project.id}`


    console.log("Project Item props", props)
    return(
            <>
            
            <Card className="item-card">
                <Card.Body className="card-contents">
                    <div className="card-main-box">
                        {cardTitleLine}
                        <Card.Text>{project.project_description}</Card.Text>
                    </div>
                    <div className="card-right-side-panel">
                        <Card.Text><Badge className="status-badge" variant="light">{project.status.value}</Badge></Card.Text>
                    </div>
                </Card.Body>
            </Card>

            <Modal size="xl" centered show={show} onHide={handleClose}>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>{project.address1}, {project.city} &mdash; {project.job_number}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                <div className="item-details-tasks-section">
                        <div className="item-details-tasks-section-header">                            
                                <h2>Project Information </h2>
                                    <a href={`../create-new-project`}>
                                        <Badge variant="secondary">Edit</Badge>
                                    </a>
                        
                        </div>
                        <div className="item-details-task-section-body">
                            <Table striped bordered hover size="sm" className="item-details-table">
                                <tbody>
                                    {renderProjectInformationRow("Budget",project.budget,"money-field")}
                                    {renderProjectInformationRow("Contract Date",project.contract_date,"date-field")}
                                    {renderProjectInformationRow("ST Contract Received",project.st_contract_received_date,"date-field")}
                                    {renderProjectInformationRow("Trusses Received",project.trusses_received_date,"date-field")}
                                    {renderProjectInformationRow("Framing Due",project.framing_due_date,"date-field")}
                                    {renderProjectInformationRow("Foundation Due",project.foundation_due_date,"date-field")}
                                    {renderProjectInformationRow("Contract Date",project.contract_date,"date-field")}
                                    {renderProjectInformationRow("Email from DWG Received",project.email_from_dwg_received_date,"date-field")}
                                    {renderProjectInformationRow("Contract Proposal Sent Date",project.contract_proposal_sent_date,"date-field")}
                                    {renderProjectInformationRow("Ready to be Invoiced Date",project.ready_to_be_invoiced_date,"date-field")}
                                </tbody>
                            </Table>
                        </div>
                    </div>

{/* Tasks Section                     */}
                    <div className="item-details-tasks-section">

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
                                    {showActivities(project.id)}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <p>Project Created: {<Moment format="MM-DD-YYYY">{project.created_at}</Moment>}</p>
                    <p>Last Updated: <Moment format="MM-DD-YYYY">{project.updated_at}</Moment></p>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
    )
}
export default ProjectItem