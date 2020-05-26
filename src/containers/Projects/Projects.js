import React, {Component} from 'react'
import ProjectList from '../../components/ProjectList/ProjectList'

class Projects extends Component {

    render() {
        return (
            <ProjectList 
                projects={this.props.projects}
                projectActivities={this.props.projectActivities} 
                statuses={this.props.statuses}
                toggleTaskCompleted={this.props.toggleTaskCompleted}
                changeStatus={this.props.changeStatus}
            />
        )
        

    }

}

export default Projects