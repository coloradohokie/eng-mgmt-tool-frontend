import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.scss'


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <nav className={attachedClasses.join(' ')} onClick={props.closed}>
            <NavigationItems />
        </nav>
    )
}

export default sideDrawer