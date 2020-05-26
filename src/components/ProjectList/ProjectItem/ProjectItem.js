import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import CurrencyFormat from 'react-currency-format'
import TaskItem from '../../../components/TaskItem/TaskItem'
import ActivityItem from '../../ActivityItem/ActivityItem'
import classes from './ProjectItem.module.css'
import AddTask from './AddTask/AddTask'


const ProjectItem = (props) => {
    console.log(props)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const project = {...props.project}
    

    const displayTitle = project.city ?
        `${project.address1}, ${project.city} \u2014 ${project.job_number}` :
        `${project.address1} \u2014 ${project.job_number}`
    
    const showTask = (project_id, filteredTask) => {
        return( 
            <TaskItem 
                key={filteredTask.id} 
                project_id={project_id}
                {...filteredTask} 
                toggleTaskCompleted={props.toggleTaskCompleted}
            /> 
        )
    }

    const filterUniqueValues = (taskArray) => {
        const unique = [...new Set(taskArray.map(item => item.template_name))]
        return unique
    }

    const getTasks = (project_id) => {
        const taskGroups = filterUniqueValues(props.project.tasks)
        return (
            <div>
                {taskGroups.map(group => {
                    return (
                        <div>
                            <h2>{group}</h2> 
                            <Table hover size="sm" className={classes.ItemDetailsTable}>
                                <tbody>
                                    {props.project.tasks.map(task => {
                                        if (task.template_name === group) {
                                            return showTask(project_id, task)
                                        }
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    )
                })}
            </div>
        )
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

    const handleClick = (event) => {
        if (event.target.name === "status") {
            console.log("you changed the status to", event.target.value, "props", props)
            props.changeStatus(event.target.value, project.id)
        }
    }

    const getStatusValues = () => {
        return props.statuses.map(status => {
            return status.id ===project.status_id ?
                <option value={status.id} defaultValue>{status.value}</option> :
                <option value={status.id}>{status.value}</option>
        })
    }

    const addActivityUrl = `../add-activity/${project.id}`


    return(
            <>
            
            <Card className={classes.ItemCard}>
                <Card.Body className={classes.CardContents}>
                    <div className={classes.CardMainBox}>
                        <Card.Title onClick={handleShow}> {displayTitle} </Card.Title> 
                        <Card.Text>{project.project_description}</Card.Text>
                    </div>
                    <div className={classes.CardRightSidePanel}>
                        <Card.Text><Badge className={classes.StatusBadge} variant="light">{project.status.value}</Badge></Card.Text>
                    </div>
                </Card.Body>
            </Card>

            <Modal size="xl" centered show={show} onHide={handleClose}>
                <Modal.Header className={classes.ModalHeader} closeButton>
                    <Modal.Title>{displayTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.ModelBody}>
                    <div className={classes.ModalStatusBar}>
                        <label>Status</label>
                        <select name="status" onChange={handleClick}>
                            {getStatusValues()}
                        </select>
                    </div>
                    <div className={classes.ModalContentsContainer}>
                        <div>
                            <div className={classes.ItemDetailsTasksSectionHeader}>                            
                                    <h2>Project Information </h2>
                                        <a href={`../create-new-project`}>
                                            <Badge variant="secondary">Edit</Badge>
                                        </a>
                            
                            </div>
                            <div className={classes.ItemDetailsTaskSectionBody}>
                                <Table striped bordered hover size="sm" className={classes.ProjectInformationTable}>
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
                        <div className={classes.ItemDetailsTasksSection}>
                            <div className={classes.ItemDetailsTasksSectionBody}>
                                {getTasks(project.id)}
                            </div>

                        </div>
                    </div>

    {/* Activity Table                     */}
                        <div className={classes.ItemDetailsSection}>
                            <div className={classes.ItemDetailsSectionHeader}>
                                <h2>Activity Log </h2>
                                <h3>
                                    <a href={addActivityUrl}>
                                        <Badge variant="secondary">Add Activity</Badge>
                                    </a>
                                </h3>
                                
                            </div>

                            <div>
                                <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
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
                <Modal.Footer className={classes.ModalFooter}>
                    <div className={classes.ModalFooterContainer}>
                        <div>
                            <p>Project Created: {<Moment format="MM-DD-YYYY">{project.created_at}</Moment>}</p>
                            <p>Last Updated: <Moment format="MM-DD-YYYY">{project.updated_at}</Moment></p>

                        </div>
                        <div>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
            </>
    )
}
export default ProjectItem