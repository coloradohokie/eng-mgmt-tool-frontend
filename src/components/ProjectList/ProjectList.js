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
                    props.projects.sort(function (a,b) {return b.job_number - a.job_number}) :
                    props.projects.sort(function (a,b) {return a.job_number - b.job_number})
                break
            case "Status":
                props.sort.ascending ? 
                    props.projects.sort(function (a,b) {return b.status.sort_id - a.status.sort_id}) :
                    props.projects.sort(function (a,b) {return a.status.sort_id - b.status.sort_id})
                break
            case "Address":
                props.sort.ascending ? 
                    props.projects.sort(function (a,b) {return b.address1 - a.address1}) :
                    props.projects.sort(function (a,b) {return a.address1 - b.address1})
                break
            case "City":
                props.sort.ascending ? 
                    props.projects.sort(function (a,b) {return b.city - a.city}) :
                    props.projects.sort(function (a,b) {return a.city - b.city})
                break
            case "% Complete":
                props.sort.ascending ? 
                    props.projects.sort(function (a,b) {return b.percent_complete - a.percent_complete}) :
                    props.projects.sort(function (a,b) {return a.percent_complete - b.percent_complete})
                break
            default:
                props.projects.sort(function (a,b) {return b.job_number - a.job_number})
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
