import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]  // change to close before release
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