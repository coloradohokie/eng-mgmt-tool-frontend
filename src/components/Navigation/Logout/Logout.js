import React from 'react'
import classes from './Logout.module.scss'

const logout = (props) => {
    return (
        <div className={classes.Logout} onClick={props.logout}>
            Logout
        </div>
    )
}

export default logout


