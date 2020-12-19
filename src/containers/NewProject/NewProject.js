import React from 'react'
import CreateNewProject from '../../components/CreateNewProject/CreateNewProject'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'


const newProject = props => (
    <CreateNewProject statuses={props.statuses} addProject={props.addProject} />
)

const mapStateToProps = state => {
    return {
        statuses: state.projects.statuses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProject: (newProject) => dispatch(actions.addProject(newProject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newProject)