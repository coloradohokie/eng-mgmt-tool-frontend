import React from 'react'
import classes from './NavBar.module.scss'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logout from '../Logout/Logout'
import Logo from '../../../assets/images/tasklist.png'

const NavBar = (props) => (
    <header className={classes.NavBar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div>
            <img src={Logo} alt="Project Task Manager" />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
            <Logout logout={props.logout} />
        </nav>
    </header>
)
export default NavBar