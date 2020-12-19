import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TaskList from '../TaskList/TaskList'
import ActivityTable from '../ActivityTable/ActivityTable'
import ProjectInformation from '../ProjectInformation/ProjectInformation'
import Moment from 'react-moment'
import classes from './ProjectDetails.module.scss'
import {connect} from 'react-redux'
import * as actions from '../../../../store/actions/index'


class ProjectDetails extends Component {

    setStatusHandler (event) {
        const updatedStatus = this.props.statuses.find(status => status.id === +event.target.value)
        const updatedProject = {...this.props.project, status_id: +event.target.value, status: updatedStatus}
        this.props.setProjectStatusId(+event.target.value)
        this.props.onUpdateProject(this.props.project.id, updatedProject)
    }

    getStatusValues () {
        return this.props.statuses.map(
            status => <option key={status.id} value={status.id}>{status.value}</option>)
    }

    filterUniqueValues (taskArray) {
        return [...new Set(taskArray.map(item => item.template_name))]
    }

    getTasks (projectId) {
        const taskGroups = this.filterUniqueValues(this.props.project.tasks)
        return (
            <div className={classes.TasksSection}>
                {taskGroups.map(group => {
                    return (
                        <div key={group} className={classes.TasksTable}>
                            <h2>{group}</h2> 
                            <TaskList 
                                tasks={this.props.project.tasks}
                                group={group} 
                                project_id={projectId} 
                                addTaskToProject={this.props.addTaskToProject}
                                toggleTaskCompleted={this.props.toggleTaskCompleted} />
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <Modal size="xl" centered show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header className={classes.ModalHeader} closeButton>
                    <Modal.Title>{this.props.displayTitle}</Modal.Title>
                </Modal.Header>
    
                <Modal.Body className={classes.ModelBody}>
                    <div className={classes.ModalStatusBar}>
                        <label>Status</label>
                        <select name="status" value={this.props.projectStatusId} onChange={this.setStatusHandler}>
                            {this.getStatusValues()}
                        </select>
                    </div>
                    <div className={classes.ModalContentsContainer}>
                        <ProjectInformation 
                            project={this.props.project} 
                            updateProject={this.props.onUpdateProject} 
                        />
                        {this.getTasks(this.props.project.id)}
                    </div>
                    <ActivityTable 
                        project={this.props.project} 
                        projectActivities={this.props.projectActivities}
                        activities={this.props.activities}
                        updateProjectActivities={this.props.updateProjectActivities} 
                    />
                </Modal.Body>
    
                <Modal.Footer className={classes.ModalFooter}>
                    <div className={classes.ModalFooterContainer}>
                        <div>
                            <p>Project Created: {<Moment format="MM-DD-YYYY">{this.props.project.created_at}</Moment>}</p>
                            <p>Last Updated: <Moment format="MM-DD-YYYY">{this.props.project.updated_at}</Moment></p>
    
                        </div>
                        <div>
                            <Button variant="secondary" onClick={this.props.handleClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        statuses: state.projects.statuses,
        projectActivities: state.projects.projectActivities,
        activities: state.projects.activities

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateProject: (id, project) => dispatch(actions.updateProject(id, project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)