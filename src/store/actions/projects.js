import * as actionTypes from './actionTypes'
import {AJAX} from '../../shared/utility'

const fetchProjectsSuccess = (response) => {
    console.log(response)
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
            await AJAX(endpoint, 'PATCH', false, projectTask)
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
            await AJAX(endpoint, 'PATCH', false, project)
            dispatch(updateProjectSuccess(id, project))
        } catch (error) {
            dispatch(updateProjectFail(error))
        }
    }
}