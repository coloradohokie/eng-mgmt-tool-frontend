import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ProjectProgress from '../../UI/ProjectProgress/ProjectProgress'
import Moment from 'react-moment'
import classes from './ProjectItem.module.scss'
import ProjectDetails from './ProjectDetails/ProjectDetails'

const ProjectItem = (props) => {
    const [show, setShow] = useState(false)
    const [projectDeets, setProjectDeets] = useState()
    const handleClose = () => {
        setShow(false)
        props.clearSelectedProject()
    }
    const [projectStatusId, setProjectStatusId] = useState(props.project.status.id)
    
    const displayTitle = props.project.city ?
        `${props.project.address1}, ${props.project.city} \u2014 ${props.project.job_number}` :
        `${props.project.address1} \u2014 ${props.project.job_number}`




    const showProjectDetails = async (projectId) => {
        setShow(true)
            props.fetchProjectDetails(projectId)
            setProjectDeets(
                <ProjectDetails 
                    show={show}
                    displayTitle={displayTitle}
                    projectStatusId={projectStatusId}
                    setProjectStatusId = {setProjectStatusId}
                    handleClose={handleClose}
                    activities={props.activities}
                    statuses={props.statuses}
                    updateProject={props.updateProject}
                    updateProjectActivities={props.updateProjectActivities}
                    addTaskToProject={props.addTaskToProject}
                    toggleTaskCompleted={props.toggleTaskCompleted}
                    addProjectActivity={props.addProjectActivity}
                />
            )
    }

    return(
        <>
            <Card className={classes.ItemCard}>
                <Card.Body className={classes.CardContents}>
                    <div className={classes.CardMainBox}>
                        <Card.Title onClick={() => showProjectDetails(props.project.id)}> {displayTitle} </Card.Title> 
                            <p>{props.project.project_description}.</p>
                            <p style={{fontSize: "0.7em", paddingTop: "4px"}}>Last Action: {props.project.last_action} <Moment format="MMM Do, h:mm a">{props.project.updated_at}</Moment></p>
                    </div>
                    <div className={classes.CardRightSidePanel}>
                        <div>
                        <Badge className={classes.StatusBadge} variant="light">
                            {props.statuses.find(status => status.id === projectStatusId).value}
                        </Badge>
                        <ProjectProgress project={props.project} />
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {show ? projectDeets : ''}
        </>
    )
}

export default ProjectItem