import React, {Component} from 'react'
import CreateNewProject from '../../components/CreateNewProject/CreateNewProject'


class NewProject extends Component {
    
    render() {
        return(
            <CreateNewProject addProject={this.props.addProject} />
        )
    }

}

export default NewProject