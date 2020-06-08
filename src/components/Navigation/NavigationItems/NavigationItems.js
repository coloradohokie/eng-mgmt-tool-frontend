import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    if (props.isAuthenticated) {
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Project List</NavigationItem>
                <NavigationItem link="/activity-log">Activity Log</NavigationItem>
                <NavigationItem link="/weekly-report">Weekly Report</NavigationItem>
                <NavigationItem link="/logout"> Logout </NavigationItem>
            </ul>
        )
    }
    return null
}

export default navigationItems