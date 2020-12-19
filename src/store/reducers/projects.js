import { addTaskToProject } from '../actions'
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    projects: [],
    projectActivities: [],
    statuses: [],
    activities: [],
    taskTemplates: [],
    selectedProject: {}
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action)
        case actionTypes.FETCH_PROJECTS_FAIL: return fetchProjectsFail(state, action)
        case actionTypes.TOGGLE_TASK_SUCCESS: return toggleTaskSuccess(state, action)
        case actionTypes.TOGGLE_TASK_FAIL: return  toggleTaskFail(state, action)
        case actionTypes.UPDATE_PROJECT_SUCCESS: return updateProjectSuccess(state, action)
        case actionTypes.UPDATE_PROJECT_FAIL: return updateProjectFail(state, action)
        case actionTypes.ADD_TASK_TO_PROJECT_SUCCESS: return addTaskToProjectSuccess(state, action)
        case actionTypes.ADD_TASK_TO_PROJECT_FAIL: return addTaskToProjectFail(state, action)
        default: return state
    }
}

// Reducer functions

function fetchProjectsSuccess (state, action) {
    const projects = action.projects
    const projectActivities = action.projectActivities
    const statuses = action.statuses
    const activities = action.activities
    const taskTemplates = action.taskTemplates
    return updateObject(state, {projects, projectActivities, statuses, activities, taskTemplates})
}

function fetchProjectsFail (state, action) {
    console.error(action.error)
    return state

}

function toggleTaskSuccess (state, action) {
    return state
}

function toggleTaskFail (state, action) {
    console.error (action.error)
    return state
}

function updateProjectSuccess(state, action) {
    return state
}

function updateProjectFail(state, action) {
    console.error(action.error)
    return state
}

function addTaskToProjectSuccess(state, action) {
    return state

}

function addTaskToProjectFail(state, action) {
    console.error(action.error)
    return state
}

export default reducer