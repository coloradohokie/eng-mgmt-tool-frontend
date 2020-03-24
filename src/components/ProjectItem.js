import React from 'react'

const ProjectItem = (props) => {
    console.log("project item", props)
    const project = {...props.project}
    console.log(project)
    return(
        <div className="project-item">
            <p>{project.job_number}:  {project.address1}, {project.city}</p>
            <p>{project.project_description}</p>

        </div>
    )
}
export default ProjectItem