import {BASE_URL} from './config'


export const AJAX = async function(endpoint, method = 'GET', auth=true, body = null) {
    try {
        const token = localStorage.getItem('token')
        const headers = {'Content-Type': 'application/json'}
        if (auth) headers['Authorization'] = `Bearer ${token}`
        if (!token) return
        const payload = {
            method,
            headers
        }
        if (body) payload.body = JSON.stringify(body)
        const response = await fetch(BASE_URL + endpoint, payload)
        const result = await response.json()
        return result
    } catch (error) {
        throw new Error (error)
    }
}


export const checkValiditity = (value, rules) => {
    let isValid = true

    if(rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid
}