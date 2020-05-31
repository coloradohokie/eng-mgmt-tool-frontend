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
        window.location.href = `/`};
    const handleShow = () => setShow(true);
    let project = {...props.project}
    const [projectStatus, setProjectStatus] = useState(props.project.status.id)
    

    const displayTitle = project.city ?
        `${project.address1}, ${project.city} \u2014 ${project.job_number}` :
        `${project.address1} \u2014 ${project.job_number}`
    


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
        const updatedProject = {...props.project, status_id: +event.target.value}
        console.log("Props.Project", {...props.project})
        console.log("UPdted Project", updatedProject)
        setProjectStatus(event.target.value)
        // props.changeStatus(updatedProject)
        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({...props.project, status_id: event.target.value})
        })
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
                        <Card.Text>{project.project_description}</Card.Text>
                    </div>
                    <div className={classes.CardRightSidePanel}>
                        <Card.Text><Badge className={classes.StatusBadge} variant="light">{props.project.status.value}</Badge></Card.Text>
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
                        <select name="status" value={projectStatus} onChange={setStatusHandler}>
                            {getStatusValues()}
                        </select>
                    </div>
                    <div className={classes.ModalContentsContainer}>
                        <ProjectInformation project={project} />
                        {getTasks(project.id)}
                    </div>
                    <ActivityTable 
                        project={project} 
                        projectActivities={props.projectActivities}
                        activities={props.activities}
                        updateProjectActivities={props.updateProjectActivities} />
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