import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TaskList from '../TaskList/TaskList'
import ActivityTable from '../ActivityTable/ActivityTable'
import ProjectInformation from '../ProjectInformation/ProjectInformation'
import ProjectInfo from '../ProjectInformation/Temp'
import Moment from 'react-moment'
import classes from './ProjectDetails.module.scss'
import { connect } from 'react-redux'


class ProjectDetails extends Component {
    setStatusHandler(event) {
        const updatedStatus = this.props.statuses.find(status => status.id === +event.target.value)
        const updatedProject = {...this.props.project, status_id: +event.target.value, status: updatedStatus}
        this.props.setProjectStatusId(+event.target.value)
        this.props.updateProject(this.props.project.id, updatedProject)
    }

    getStatusValues() {
        return this.props.statuses.map(
            status => <option key={status.id} value={status.id}>{status.value}</option>)
    }

    filterUniqueValues(taskArray) {
        return [...new Set(taskArray.map(item => item.template_name))]
    }

    getTasks() {
        if (!this.props.selectedProject.tasks) return (<h2>No Task Information</h2>)
        const taskGroups = this.filterUniqueValues(this.props.selectedProject.tasks)
        return (
            <div className={classes.TasksSection}>
                {taskGroups.map(group => {
                    return (
                        <div key={group} className={classes.TasksTable}>
                            <h2>{group}</h2> 
                            <TaskList 
                                tasks={this.props.selectedProject.tasks}
                                group={group} 
                                project_id={this.props.selectedProject.id} 
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
            <Modal size="xl" centered show={true} onHide={this.props.handleClose}>
            {/* <Modal size="xl" centered show={this.props.show} onHide={this.props.handleClose}> */}
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
                            project={this.props.selectedProject} 
                            updateProject={this.props.updateProject} 
                        />
                        {this.getTasks()}
                    </div>
                    {/* <ActivityTable 
                        project={this.props.selectedProject} 
                        // projectActivities={this.props.projectActivities}
                        activities={this.props.activities}
                        updateProjectActivities={this.props.updateProjectActivities}
                        addProjectActivity={this.props.addProjectActivity} 
                    /> */}
                </Modal.Body>
    
                <Modal.Footer className={classes.ModalFooter}>
                    <div className={classes.ModalFooterContainer}>
                        <div>
                            <p>Project Created: {<Moment format="MM-DD-YYYY">{this.props.selectedProject.created_at}</Moment>}</p>
                            <p>Last Updated: <Moment format="MM-DD-YYYY">{this.props.selectedProject.updated_at}</Moment></p>
    
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
        selectedProject: state.projects.selectedProject
    }
}

export default connect(mapStateToProps)(ProjectDetails)