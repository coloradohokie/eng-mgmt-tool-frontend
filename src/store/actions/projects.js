import * as actionTypes from './actionTypes'
import {AJAX} from '../../shared/utility'

const fetchProjectsSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        projects: response.projects,
        projectActivities: response.project_activities,
        statuses: response.statuses,
        activities: response.activities,
        taskTemplates: response.task_templates
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

const toggleTaskSuccess = () => {
    return {
        type: actionTypes.TOGGLE_TASK_SUCCESS,
    }
}

const toggleTaskFail = (error) => {
    return {
        type: actionTypes.TOGGLE_TASK_FAIL,
        error
    }
}

export const toggleTask = (taskId, projectTask) => {
    return async dispatch => {
        try {
            const endpoint = `tasks/${taskId}`
            await AJAX(endpoint, 'PATCH', true, projectTask)
            dispatch(toggleTaskSuccess())
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



