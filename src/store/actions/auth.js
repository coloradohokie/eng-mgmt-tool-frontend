import * as actionTypes from './actionTypes'
import { AJAX } from '../../shared/utility'

export const logOut = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthState = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE
    }
}

const loginSuccess = (payload) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload
    }
}

const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error
    }
}

export const loginStart = (payload) => {
    return async dispatch => {
        try {
            const response = await AJAX('login', 'POST', false, payload)
            console.log(response)
            if (!response || !response.token) throw new Error ('Bad Login')
            
            localStorage.setItem('token', response.token)
            const expirationDate = new Date(new Date().getTime() + (response.expiration * 1000))
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('username', response.username)
            localStorage.setItem('userId', response.user_id)
            dispatch(loginSuccess())
            window.location.href = "/"
            
        } catch (error) {
            console.error(error)  
            dispatch(loginFail(error))  
        }
    } 
    
}
