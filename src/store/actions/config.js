import * as actionTypes from './actionTypes'
import {AJAX} from '../../shared/utility'

export const updateValues = (valueList, newValue) => {
    return {
        type: actionTypes.UPDATE_VALUES,
        valueList,
        newValue
    }
}

//I don't think this is currently used. It may be part of admin functions
export const addActivity = (newActivity) => {
    const addActivitySuccess = (activity) => {
        return {
            type: actionTypes.ADD_ACTIVITY_SUCCESS,
            activity
        }
    }

    const addActivityFail = (error) => {
        return {
            type: actionTypes.ADD_ACTIVITY_FAIL,
            error
        }
    }

    return async dispatch => {
        try {
            const response = await AJAX('project_activities', 'POST', false, newActivity)
            dispatch(addActivitySuccess(response))
            window.location.href = `/item-details/${newActivity.project_id}`
        } catch (error) {
            dispatch(addActivityFail(error))
        }
    }
}