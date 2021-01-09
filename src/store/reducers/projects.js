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
        case actionTypes.FETCH_PROJECT_DETAILS_SUCCESS: return fetchProjectDetailsSuccess(state, action)
        case actionTypes.FETCH_PROJECT_DETAILS_FAIL: return fetchProjectDetailsFail(state, action)
        case actionTypes.CLEAR_SELECTED_PROJECT: return clearSelectedProject(state, action)
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
        case actionTypes.UPDATE_LAST_ACTION: return updateLastAction(state, action)
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

function fetchProjectDetailsSuccess (state, action) {
    const selectedProject = action.selectedProject
    return updateObject(state, {selectedProject})
}

function fetchProjectDetailsFail (state, action) {
    console.error(action.error)
    return state
}

function clearSelectedProject (state, action) {
    const selectedProject = {}
    return updateObject(state, {selectedProject})
}
 
function toggleTaskSuccess (state, action) {
    const updatedTask = action.task
    const selectedProject = state.selectedProject
    selectedProject.tasks.map((item) => {
        if (item.id !== updatedTask.id) return item
        return {
            ...item,
            ...updatedTask
        }
    })

    return updateObject(state, {selectedProject})
}

function toggleTaskFail (state, action) {
    console.error (action.error)
    return state
}

function updateProjectSuccess(state, action) {
    return updateObject(state, {selectedProject: action.project})
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

function updateLastAction(state, action) {
    const updatedSelectedProject = updateObject(state.selectedProject, {last_action: action.lastAction})
    return updateObject(state, {selectedProject: updatedSelectedProject})
}

export default reducer