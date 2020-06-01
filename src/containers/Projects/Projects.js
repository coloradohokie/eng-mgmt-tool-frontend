import React, {Component} from 'react'
import ProjectList from '../../components/ProjectList/ProjectList'
import classes from './Projects.module.css'

class Projects extends Component {

    render() {
        return (
            <div className={classes.Projects}>
                <ProjectList 
                    projects={this.props.projects}
                    projectActivities={this.props.projectActivities}
                    activities={this.props.activities} 
                    statuses={this.props.statuses}
                    toggleTaskCompleted={this.props.toggleTaskCompleted}
                    updateProject={this.props.updateProject}
                    addTaskToProject={this.props.addTaskToProject}
                    updateProjectActivities={this.props.updateProjectActivities}
                    />
            </div>
        )
        

    }

}

export default Projects