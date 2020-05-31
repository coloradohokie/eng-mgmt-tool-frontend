import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Moment from 'react-moment'
import classes from './ProjectItem.module.css'
import TaskList from './TaskList/TaskList'
import ActivityTable from './ActivityTable/ActivityTable'
import ProjectInformation from './ProjectInformation/ProjectInformation'

const ProjectItem = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const [projectStatusId, setProjectStatusId] = useState(props.project.status.id)
    
    const displayTitle = props.project.city ?
        `${props.project.address1}, ${props.project.city} \u2014 ${props.project.job_number}` :
        `${props.project.address1} \u2014 ${props.project.job_number}`
    


    const filterUniqueValues = (taskArray) => {
        const unique = [...new Set(taskArray.map(item => item.template_name))]
        return unique
    }

    const getTasks = (project_id) => {
        const taskGroups = filterUniqueValues(props.project.tasks)
        return (
            <div className={classes.TasksSection}>
                {taskGroups.map(group => {
                    return (
                        <div key={group} className={classes.TasksTable}>
                            <h2>{group}</h2> 
                            <TaskList 
                                tasks={props.project.tasks}
                                group={group} 
                                project_id={project_id} 
                                addTaskToProject={props.addTaskToProject}
                                toggleTaskCompleted={props.toggleTaskCompleted} />
                        </div>
                    )
                })}
            </div>
        )
    }

    // const showInvoiceBadge = (ready_to_be_invoiced) => {
    //     if (ready_to_be_invoiced) {
    //         return <h3><Badge variant="secondary">Ready to Be Invoiced</Badge></h3>
    //     }
    // }

    const setStatusHandler = (event) => {
        const updatedStatus = props.statuses.find(status => status.id === +event.target.value)
        const updatedProject = {...props.project, status_id: +event.target.value, status: updatedStatus}
        console.log(updatedStatus)
        console.log("Props.Project", {...props.project})
        console.log("UPdted Project", updatedProject)
        setProjectStatusId(+event.target.value)
        props.changeStatus(props.project.id, updatedProject)
    }
    

    const getStatusValues = () => {
        return props.statuses.map(status => <option key={status.id} value={status.id}>{status.value}</option>)
    }

    return(
            <>
            
            <Card className={classes.ItemCard}>
                <Card.Body className={classes.CardContents}>
                    <div className={classes.CardMainBox}>
                        <Card.Title onClick={handleShow}> {displayTitle} </Card.Title> 
                        <Card.Text>{props.project.project_description}</Card.Text>
                    </div>
                    <div className={classes.CardRightSidePanel}>
                        <Card.Text><Badge className={classes.StatusBadge} variant="light">{props.statuses.find(status => status.id === projectStatusId).value}</Badge></Card.Text>
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
                        <select name="status" value={projectStatusId} onChange={setStatusHandler}>
                            {getStatusValues()}
                        </select>
                    </div>
                    <div className={classes.ModalContentsContainer}>
                        <ProjectInformation project={props.project} />
                        {getTasks(props.project.id)}
                    </div>
                    <ActivityTable 
                        project={props.project} 
                        projectActivities={props.projectActivities}
                        activities={props.activities}
                        updateProjectActivities={props.updateProjectActivities} />
                </Modal.Body>

                <Modal.Footer className={classes.ModalFooter}>
                    <div className={classes.ModalFooterContainer}>
                        <div>
                            <p>Project Created: {<Moment format="MM-DD-YYYY">{props.project.created_at}</Moment>}</p>
                            <p>Last Updated: <Moment format="MM-DD-YYYY">{props.project.updated_at}</Moment></p>

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