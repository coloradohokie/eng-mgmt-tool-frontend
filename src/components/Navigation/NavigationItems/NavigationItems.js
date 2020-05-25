import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Project List</NavigationItem>
        <NavigationItem link="/create-new-project">Create New Project</NavigationItem>
        <NavigationItem link="/phone-log">Phone Log</NavigationItem>
        <NavigationItem link="/to-be-invoiced">To Be Invoiced</NavigationItem>
        <NavigationItem link="/weekly-report">Weekly Report</NavigationItem>
        <NavigationItem link="/admin">Admin</NavigationItem>
    </ul>
)

export default navigationItems