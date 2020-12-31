import * as actionTypes from './actionTypes'
import {AJAX} from '../../shared/utility'

export const updateValues = (title, newValue) => {
    const updateValuesSuccess = (valueList, newValue) => {
        return {
            type: actionTypes.UPDATE_VALUES_SUCCESS,
            valueList,
            newValue
        }
    }

    const updateValuesFail = (error) => {
        return {
            type: actionTypes.UPDATE_VALUES_FAIL,
            error
        }
    }

    return async dispatch => {
        try {
            let endpoint = ""
            switch (title) {
                case "Task Templates":
                    endpoint = "task_templates"
                    break
                case "Project Statuses":
                    endpoint = "statuses"
                    break
                case "Activity Values":
                    endpoint = "activities"
                    break
                default:
                    endpoint = ""
            }
            const response = await AJAX(endpoint, 'POST', true, newValue)
            dispatch(updateValuesSuccess(title, response))
        } catch (error) {
            dispatch(updateValuesFail(error))
        }
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