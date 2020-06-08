import React from 'react'
import { Redirect } from 'react-router-dom';

const logout = (props) => {
    console.log("Logout Called")
    props.logout()
    return null
}

export default logout