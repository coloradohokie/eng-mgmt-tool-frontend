import * as actionTypes from './actionTypes'
import {AJAX} from '../../shared/utility'

const fetchProjectsSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: response.projects,
        projectActivities: response.project_activities,
        statuses: response.statuses,
        activities: response.activities
    }
}

const fetchProjectsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PROJECTS_FAIL,
        error
    }
}

export const fetchProjects = () => {
    return async (dispatch) => {
        try {
            const endpoint = 'projects'
            const response = await AJAX(endpoint)

            dispatch(fetchProjectsSuccess(response))

        } catch (error) {
            console.error(error)
            dispatch(fetchProjectsFail(error))
        }
    }
}

export const fetchProjectDetails = (projectId) => {
    const fetchProjectDetailsSuccess = (selectedProject) => {
        return {
            type: actionTypes.FETCH_PROJECT_DETAILS_SUCCESS,
            selectedProject
        }
    }

    const fetchProjectDetailsFail = (error) => {
        return {
            type: actionTypes.FETCH_PROJECT_DETAILS_FAIL,
            error
        }
    }

    return async (dispatch) => {
        try {
            const endpoint = `projects/${projectId}`
            const response = await AJAX(endpoint)
            dispatch(fetchProjectDetailsSuccess(response))
        } catch (error) {
            dispatch(fetchProjectDetailsFail(error))
        }
    }
}

export const clearSelectedProject = () => {
    return {
        type: actionTypes.CLEAR_SELECTED_PROJECT
    }
}

const toggleTaskSuccess = (task) => {
    return {
        type: actionTypes.TOGGLE_TASK_SUCCESS,
        task
    }
}

const toggleTaskFail = (error) => {
    return {
        type: actionTypes.TOGGLE_TASK_FAIL,
        error
    }
}

export const toggleTask = (task) => {
    return async dispatch => {
        try {
            console.log(task)
            task.done = !task.done
            const endpoint = `tasks/${task.id}`
            await AJAX(endpoint, 'PATCH', true, task)
            dispatch(toggleTaskSuccess(task))
        } catch (error) {
            dispatch(toggleTaskFail(error))
        }
    }
}

const updateProjectSuccess = (id, project) => {
    return {
        type: actionTypes.UPDATE_PROJECT_SUCCESS,
        id,
        project
    }
}

const updateProjectFail = (error) => {
    return {
        type: actionTypes.UPDATE_PROJECT_FAIL,
        error
    }
}

export const updateProject = (id, project) => {
    return async dispatch => {
        try {
            const endpoint = `projects/${id}`
            await AJAX(endpoint, 'PATCH', true, project)
            dispatch(updateProjectSuccess(id, project))
        } catch (error) {
            dispatch(updateProjectFail(error))
        }
    }
}

const addTaskToProjectSuccess = (newTask) => {
    return {
        type: actionTypes.ADD_TASK_TO_PROJECT_SUCCESS,
        newTask
    }
}

const addTaskToProjectFail = (error) => {
    return {
        type: actionTypes.ADD_TASK_TO_PROJECT_FAIL,
        error
    }
}

export const addTaskToProject = (taskName, projectId, group) => {
    return async dispatch => {
        try {
            const newTask = { 
                task: {
                    name: taskName,
                    project_id: projectId,
                    template_name: group,
                    active: true,
                    done: false
                }
            }
            await AJAX('tasks', 'POST', true , newTask)
            dispatch(addTaskToProjectSuccess(newTask))
        } catch (error) {
            dispatch(addTaskToProjectFail(error))
        }
    }
}

export const updateProjectActivities = (newValue) => {
    return {
        type: actionTypes.UPDATE_PROJECT_ACTIVITIES,
        newValue
    }
}

export const addProject = (newProject) => {
    const addProjectSuccess = (newProject) => {
        return {
            type: actionTypes.ADD_PROJECT_SUCCESS,
            newProject
        }
    }

    const addProjectFail = (error) => {
        return {
            type: actionTypes.ADD_PROJECT_FAIL,
            error
        }
    }

    return async dispatch => {
        try {
            const project = await AJAX('projects', 'POST', true, newProject)
            dispatch(addProjectSuccess(project))
            window.location.href = '/'
        } catch (error) {
            dispatch(addProjectFail(error))
        }

    }
}


export const addProjectActivity = (newActivity) => {
    const addProjectActivitySuccess = (newProjectActivity) => {
        return {
            type: actionTypes.ADD_PROJECT_ACTIVITY_SUCCESS,
            newProjectActivity
        }
    }

    const addProjectActivityFail = (error) => {
        return {
            type: actionTypes.ADD_PROJECT_ACTIVITY_FAIL,
            error
        }
    }

    return async dispatch => {
        try {
            const project_activity = newActivity
            const newProjectActivity = await AJAX('project_activities', 'POST', true, {project_activity})
            dispatch(addProjectActivitySuccess({...newActivity, id:newProjectActivity.id}))
        } catch (error) {
            dispatch(addProjectActivityFail(error))
        }
    }
}

export const updateLastAction = (lastAction) => {
    return {
        type: actionTypes.UPDATE_LAST_ACTION,
        lastAction
    }
}