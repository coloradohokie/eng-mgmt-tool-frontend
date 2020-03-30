import React from 'react'
import ProjectItem from './ProjectItem'


const ProjectList = (props) => {

    const showProjects = () => {
        props.projects.sort(function (a,b) {return b.job_number - a.job_number})
        return (props.projects.map(project => 
            <ProjectItem 
                key={project.id} 
                project={project}
                projectActivities={props.projectActivities} 
                taskCategories={props.taskCategories}
                projectTasks={props.projectTasks} 
                tasks={props.tasks}
                toggleTaskCompleted={props.toggleTaskCompleted} 
                statuses={props.statuses}
                changeStatus={props.changeStatus}
            /> ))
    }

    return (
        <div className="project-list">
            <h1>Project List</h1>
            {showProjects()}
        </div>
    )
}

export default ProjectList
