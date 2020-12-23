import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT: return logOut(state, action)
        case actionTypes.CHECK_AUTH_STATE: return checkAuthState(state, action)
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action)
        case actionTypes.LOGIN_FAIL: return loginFail(state, action)
        default: return state
    }
}

//REDUCER FUNCTIONS

function logOut(state, action) {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    return updateObject (state, {isAuthenticated: false})
}

function checkAuthState(state, action) {
    const token = localStorage.getItem('token')
    if (!token) {
        console.error("No Token")
        return updateObject (state, {isAuthenticated: false})
    } else {
        const expirationDate = localStorage.getItem('expirationDate')
        if (expirationDate < new Date()) {
            console.error("Token expired")
            logOut()
            return state

        } else {
            return updateObject(state, {isAuthenticated:true})
        }
    }
}

function loginSuccess(state, action) {
    return state
}

function loginFail(state, action) {
    return state
}

export default reducer