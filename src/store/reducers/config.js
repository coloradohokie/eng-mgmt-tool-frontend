import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    statuses: [],
    taskTemplates: [],
    activities: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_VALUES: return updateValues(state, action)
        default: return state
    }

}

//REDUCER FUNCTIONS

function updateValues(state, action) {
    let updatedState
    if (action.valueList === "Task Templates") updatedState = updateObject(state.taskTemplates, action.newValue)
    if (action.valueList === "Project Statuses") updatedState = updateObject(state.statuses, action.newValue)
    if (action.valueList === "Activity Values") updatedState = updateObject(state.activities, action.newValue)
    return updateObject(state, updatedState)
}

export default reducer