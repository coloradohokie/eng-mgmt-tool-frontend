import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { Switch, Route } from 'react-router-dom'

import Projects from './containers/Projects/Projects'
import ActivityLog from './containers/ActivityLog/ActivityLog'
import NewProject from './containers/NewProject/NewProject'
import WeeklyReport from './containers/WeeklyReport/WeeklyReport'
import Config from './containers/Config/Config'
import Layout from './containers/Layout/Layout'
import Auth from './containers/Auth/Auth'

var moment = require('moment');
moment().format();

export default class App extends React.Component {
  
  state = {
    isAuthenticated: false
  }

  constructor(props) {
    super()
    this.checkAuthState()
  }

  componentDidMount = () => {
    this.checkAuthState()
  }

  checkAuthState = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.error("No Token")
        this.logout()
    } else {
        const expirationDate = localStorage.getItem('expirationDate')
        if (expirationDate < new Date()) {
            console.error("Token expired")
            this.logout()

        } else {
            // const userId = localStorage.getItem('userId')
            this.setState({isAuthenticated: true})

        }
    }
  }

  logout = () => {
    this.setState({isAuthenticated: false})
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }

  render() {

    let routes = (
      <Switch>
        <Route exact path='/auth' component={Auth} /> 
      </Switch>
    )

    if (this.state.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path='/'>
            <Projects />
          </Route>

          <Route path='/create-new-project'>
            <NewProject />
          </Route>
              
          <Route exact path='/activity-log'>
            <ActivityLog />
          </Route>

          <Route exact path='/weekly-report'>
            <WeeklyReport />
          </Route> 

          <Route exact path='/config'>
            <Config />
          </Route>
        </Switch>
      )
    }

    if (this.state.isAuthenticated) {
      return (
        <Layout isAuthenticated={this.state.isAuthenticated} logout={this.logout}>
          {routes}
        </Layout>
      )
    }

    return <Auth />
  }
}

