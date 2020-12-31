import * as actionTypes from '../actions/actionTypes'
import { insertItemIntoArray, updateObject } from '../utility'

const initialState = {
    projects: [],
    projectActivities: [],
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
        case actionTypes.UPDATE_PROJECT_ACTIVITIES: return updateProjectActivities(state, action) //retired??
        case actionTypes.ADD_PROJECT: return addProject(state, action)
        case actionTypes.ADD_PROJECT_ACTIVITY_SUCCESS: return addProjectActivitySuccess(state, action)
        case actionTypes.ADD_PROJECT_ACTIVITY_FAIL: return addProjectActivityFail(state, action)
        default: return state
    }
}

// Reducer functions

function fetchProjectsSuccess (state, action) {
    const projects = action.projects
    const projectActivities = action.projectActivities
    return updateObject(state, {projects, projectActivities})
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

//I think this one has been retired.
function updateProjectActivities(state, action) {
    return updateObject(state.projectActivities, action.newValue)
}

function addProject(state, action) {
    const updatedProjects = updateObject(state.projects, action.newProject)
    return updateObject(state, updatedProjects)
}

function addProjectActivitySuccess(state, action) {
    const updatedProjectActivities = insertItemIntoArray(state.projectActivities, {index: state.projectActivities.length, item: action.newProjectActivity})
    return updateObject(state, {projectActivities: updatedProjectActivities})
}

function addProjectActivityFail(state, action) {
    console.error(action.error)
    return state
}

export default reducer