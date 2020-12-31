import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    statuses: [],
    taskTemplates: [],
    activities: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PROJECTS_SUCCESS: return fetchProjectsSuccess(state, action)
        case actionTypes.UPDATE_VALUES_SUCCESS: return updateValuesSuccess(state, action)
        default: return state
    }

}

//REDUCER FUNCTIONS

function updateValuesSuccess(state, action) {
    let updatedState
    if (action.valueList === "Task Templates") updatedState = updateObject(state.taskTemplates, action.newValue)
    if (action.valueList === "Project Statuses") updatedState = updateObject(state.statuses, action.newValue)
    if (action.valueList === "Activity Values") updatedState = updateObject(state.activities, action.newValue)
    return updateObject(state, updatedState)
}

function fetchProjectsSuccess(state, action) {
    const statuses = action.statuses
    const activities = action.activities
    const taskTemplates = action.taskTemplates
    return updateObject(state, {statuses, activities, taskTemplates})
}

export default reducer