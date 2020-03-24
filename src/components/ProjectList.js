import React from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = (props) => {

    const showProjects = () => {
        return props.projects.map(project => <ProjectItem key={project.id} project={project} /> )
    }

    return (
        <div className="project-list">
            <h1>Project List</h1>
            {showProjects()}
        </div>
    )
}

export default ProjectList
