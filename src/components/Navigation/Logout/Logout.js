import React from 'react'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
import classes from './Logout.module.css'

const logout = (props) => {
    return (
        <div className={classes.Logout} onClick={props.logout}>
            Logout
        </div>
    )
}

export default logout


