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
    // <a href='/' className="nav-bar-item">Project List</a>
    // <a href='/create-new-project' className="nav-bar-item">Create New Project</a>
    // <a href='/phone-log' className="nav-bar-item">Phone Log</a>
    // <a href='/to-be-invoiced' className="nav-bar-item">To Be Invoiced</a>
    // <a href='/weekly-report' className="nav-bar-item">Weekly Report</a>
    // <a href='/admin' className="nav-bar-item">Admin</a>


)

export default navigationItems