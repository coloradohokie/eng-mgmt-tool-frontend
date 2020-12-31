import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ProjectProgress from '../../UI/ProjectProgress/ProjectProgress'
import Moment from 'react-moment'
import classes from './ProjectItem.module.scss'
import ProjectDetails from './ProjectDetails/ProjectDetails'


const ProjectItem = (props) => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const [projectStatusId, setProjectStatusId] = useState(props.project.status.id)
    
    const displayTitle = props.project.city ?
        `${props.project.address1}, ${props.project.city} \u2014 ${props.project.job_number}` :
        `${props.project.address1} \u2014 ${props.project.job_number}`
    
    return(
        <>
            <Card className={classes.ItemCard}>
                <Card.Body className={classes.CardContents}>
                    <div className={classes.CardMainBox}>
                        <Card.Title onClick={() => setShow(true)}> {displayTitle} </Card.Title> 
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
            <ProjectDetails 
                show={show}
                displayTitle={displayTitle}
                projectStatusId={projectStatusId}
                setProjectStatusId = {setProjectStatusId}
                handleClose={handleClose}
                project={props.project}
                updateProjectActivities={props.updateProjectActivities}
                addTaskToProject={props.addTaskToProject}
                toggleTaskCompleted={props.toggleTaskCompleted}
                addProjectActivity={props.addProjectActivity}
            />
        </>
    )
}
export default ProjectItem