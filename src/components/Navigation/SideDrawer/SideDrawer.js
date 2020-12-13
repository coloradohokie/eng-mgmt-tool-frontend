import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
// import Logo from '../../../assets/images/tasklist.png'
import Logout from '../Logout/Logout'
import classes from './SideDrawer.module.scss'


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) attachedClasses = [classes.SideDrawer, classes.Open]

    return (
        <nav className={attachedClasses.join(' ')} onClick={props.closed}>

            {/* <Logo /> */}
            <NavigationItems isAuthenticated={props.isAuthenticated} />
            <Logout />
        </nav>
    )
}

export default sideDrawer