import React from 'react'
import ProjectItem from './ProjectItem/ProjectItem'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import classes from './ProjectList.module.css'


const ProjectList = (props) => {

    const showProjects = () => {
        props.projects.sort(function (a,b) {return b.job_number - a.job_number})
        return (props.projects.map(project => 
            <ProjectItem 
                key={project.id} 
                project={project}
                activities={props.activities}
                projectActivities={props.projectActivities} 
                toggleTaskCompleted={props.toggleTaskCompleted} 
                statuses={props.statuses}
                updateProject={props.updateProject}
                addTaskToProject={props.addTaskToProject}
                updateProjectActivities={props.updateProjectActivities}
            /> ))
    }

    return (
        <div className={classes.ProjectList}>
            <div className={classes.ProjectListHeader}>
                <h1>Project List</h1>
                <Link to='/create-new-project'>
                    <Button size="sm" variant="secondary"> New Project </Button>
                </Link>
            </div>
            {showProjects()}
        </div>
    )
}

export default ProjectList
