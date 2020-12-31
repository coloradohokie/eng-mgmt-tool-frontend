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

