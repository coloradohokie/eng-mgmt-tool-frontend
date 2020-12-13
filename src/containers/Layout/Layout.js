import React, { Component } from 'react'
import classes from './Layout.module.scss'
import NavBar from '../../components/Navigation/NavBar/NavBar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    render() {
        return (
            <>
            <NavBar
                isAuthenticated={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}
                logout = {this.props.logout} />
            <SideDrawer
                isAuthenticated={this.props.isAuthenticated}
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}
                logout = {this.props.logout} />
            <main className={classes.Content}>
                {this.props.children}
            </main>

            </>
        )
    }
}

export default Layout