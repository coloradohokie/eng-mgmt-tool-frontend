import React, { Component } from 'react';
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
import * as actions from './store/actions/index'

import { connect } from 'react-redux'

var moment = require('moment');
moment().format();

class App extends Component {
  componentDidMount = () => {
    this.props.onCheckAuthState()
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path='/auth' component={Auth} /> 
      </Switch>
    )

    if (this.props.isAuthenticated) {
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

    if (this.props.isAuthenticated) {
      return (
        <Layout isAuthenticated={this.props.isAuthenticated} logout={this.props.onLogOut}>
          {routes}
        </Layout>
      )
    }

    return (<Auth />)
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(actions.logOut()),
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

