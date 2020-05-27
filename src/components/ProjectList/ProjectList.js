import React from 'react'
import ProjectItem from './ProjectItem/ProjectItem'
import classes from './ProjectList.module.css'


const ProjectList = (props) => {

    const showProjects = () => {
        props.projects.sort(function (a,b) {return b.job_number - a.job_number})
        return (props.projects.map(project => 
            <ProjectItem 
                key={project.id} 
                project={project}
                projectActivities={props.projectActivities} 
                toggleTaskCompleted={props.toggleTaskCompleted} 
                statuses={props.statuses}
                changeStatus={props.changeStatus}
                addTaskToProject={props.addTaskToProject}
            /> ))
    }

    return (
        <div className={classes.ProjectList}>
            <h1>Project List</h1>
            {showProjects()}
        </div>
    )
}

export default ProjectList
