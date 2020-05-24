import React from 'react'
import classes from './NavBar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const NavBar = (props) => (
    <header className={classes.NavBar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)
export default NavBar