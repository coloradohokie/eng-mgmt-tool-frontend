import React, {Component} from 'react'
import CreateNewProject from '../../components/CreateNewProject/CreateNewProject'


class NewProject extends Component {
    
    render() {
        return(
            <CreateNewProject statuses={this.props.statuses} addProject={this.props.addProject} />
        )
    }

}

export default NewProject