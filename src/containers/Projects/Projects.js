import React, {Component} from 'react'
import ProjectList from '../../components/ProjectList/ProjectList'

class Projects extends Component {

    render() {
        return (
            <ProjectList 
                projects={this.props.projects}
                projectActivities={this.props.projectActivities} 
                taskCategories={this.props.taskCategories}
                projectTasks={this.props.projectTasks} 
                tasks={this.props.tasks}
                statuses={this.props.statuses}
                toggleTaskCompleted={this.props.toggleTaskCompleted}
                changeStatus={this.props.changeStatus}
            />
        )
        

    }

}

export default Projects