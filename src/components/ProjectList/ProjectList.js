import React from 'react'
import ProjectItem from './ProjectItem/ProjectItem'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import classes from './ProjectList.module.scss'

const ProjectList = (props) => {

    const showProjects = () => {
        switch (props.sort.selectedMethod) {
            case "Job Number":
                props.sort.ascending ? 
                    props.projects.sort((a,b) => b.job_number - a.job_number) :
                    props.projects.sort((a,b) => a.job_number - b.job_number)
                break
            case "Status":
                props.sort.ascending ? 
                    props.projects.sort((a,b) => b.status.sort_id - a.status.sort_id) :
                    props.projects.sort((a,b) => a.status.sort_id - b.status.sort_id)
                break
            case "Address":
                props.sort.ascending ? 
                    props.projects.sort((a,b) => b.address1 - a.address1) :
                    props.projects.sort((a,b) => a.address1 - b.address1)
                break
            case "City":
                props.sort.ascending ? 
                    props.projects.sort((a,b) => b.city - a.city) :
                    props.projects.sort((a,b) => a.city - b.city)
                break
            case "% Complete":
                props.sort.ascending ? 
                    props.projects.sort((a,b) => b.percent_complete - a.percent_complete) :
                    props.projects.sort((a,b) => a.percent_complete - b.percent_complete)
                break
            default:
                props.projects.sort((a,b) => b.job_number - a.job_number)
        }

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
                addProjectActivity={props.addProjectActivity}
                fetchProjectDetails={props.fetchProjectDetails}
                clearSelectedProject={props.clearSelectedProject}
                selectedProject={props.selectedProject}
            /> 
        ))
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
