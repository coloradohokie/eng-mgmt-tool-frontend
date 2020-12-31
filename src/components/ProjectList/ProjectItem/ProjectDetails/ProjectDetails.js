import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import TaskList from '../TaskList/TaskList'
import ActivityTable from '../ActivityTable/ActivityTable'
import ProjectInformation from '../ProjectInformation/ProjectInformation'
import Moment from 'react-moment'
import classes from './ProjectDetails.module.scss'
import {connect} from 'react-redux'
import * as actions from '../../../../store/actions/index'


const projectDetails = props => {

    const setStatusHandler = (event) => {
        const updatedStatus = props.statuses.find(status => status.id === +event.target.value)
        const updatedProject = {...props.project, status_id: +event.target.value, status: updatedStatus}
        props.setProjectStatusId(+event.target.value)
        props.onUpdateProject(props.project.id, updatedProject)
    }

    const getStatusValues = () => {
        return props.statuses.map(
            status => <option key={status.id} value={status.id}>{status.value}</option>)
    }

    const filterUniqueValues = (taskArray) => {
        return [...new Set(taskArray.map(item => item.template_name))]
    }

    const getTasks = (projectId) => {
        const taskGroups = filterUniqueValues(props.project.tasks)
        return (
            <div className={classes.TasksSection}>
                {taskGroups.map(group => {
                    return (
                        <div key={group} className={classes.TasksTable}>
                            <h2>{group}</h2> 
                            <TaskList 
                                tasks={props.project.tasks}
                                group={group} 
                                project_id={projectId} 
                                addTaskToProject={props.addTaskToProject}
                                toggleTaskCompleted={props.toggleTaskCompleted} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <Modal size="xl" centered show={props.show} onHide={props.handleClose}>
            <Modal.Header className={classes.ModalHeader} closeButton>
                <Modal.Title>{props.displayTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body className={classes.ModelBody}>
                <div className={classes.ModalStatusBar}>
                    <label>Status</label>
                    <select name="status" value={props.projectStatusId} onChange={setStatusHandler}>
                        {getStatusValues()}
                    </select>
                </div>
                <div className={classes.ModalContentsContainer}>
                    <ProjectInformation 
                        project={props.project} 
                        updateProject={props.onUpdateProject} 
                    />
                    {getTasks(props.project.id)}
                </div>
                <ActivityTable 
                    project={props.project} 
                    // projectActivities={props.projectActivities}
                    activities={props.activities}
                    updateProjectActivities={props.updateProjectActivities}
                    addProjectActivity={props.addProjectActivity} 
                />
            </Modal.Body>

            <Modal.Footer className={classes.ModalFooter}>
                <div className={classes.ModalFooterContainer}>
                    <div>
                        <p>Project Created: {<Moment format="MM-DD-YYYY">{props.project.created_at}</Moment>}</p>
                        <p>Last Updated: <Moment format="MM-DD-YYYY">{props.project.updated_at}</Moment></p>

                    </div>
                    <div>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
    
}

const mapStateToProps = state => {
    return {
        statuses: state.config.statuses,
        projectActivities: state.projects.projectActivities,
        activities: state.config.activities

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateProject: (id, project) => dispatch(actions.updateProject(id, project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(projectDetails)