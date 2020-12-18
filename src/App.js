import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import { Switch, Route } from 'react-router-dom'

import Projects from './containers/Projects/Projects'
import ActivityLog from './components/ActivityLog/ActivityLog'
import NewProject from './containers/NewProject/NewProject'
import WeeklyReport from './containers/WeeklyReport/WeeklyReport'
import Admin from './containers/Admin/Admin'
import Layout from './containers/Layout/Layout'
import Auth from './containers/Auth/Auth'
import { AJAX } from './shared/utility'

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
   // this.fetchProjects()
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


  addProject = async (newProject) => {
    try {
      const project = await AJAX('projects', 'POST', false, newProject)
      this.setState({projects: [...this.state.projects, project]})
      window.location.href = '/'
    } catch (error) {
      console.error(error)
    }
  }

  addActivity = async (newActivity) => {
    try {
      const activity = await AJAX('project_activities', 'POST', false, newActivity)
      this.setState([...this.state.projectActivities, activity])
      window.location.href = `/item-details/${newActivity.project_id}`
    } catch (error) {
      console.error(error)
    }
  }

  updateValues = (valueList, newValue) => {
    if (valueList === "Task Templates") {
        this.setState({taskTemplates: [...this.state.taskTemplates, newValue]})
    }
    if (valueList === "Project Statuses") {
        this.setState({statuses: [...this.state.statuses, newValue]})
    }
    if (valueList === "Activity Values") {
        this.setState({activities: [...this.state.activities, newValue]})
    }
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
            <Projects
              // projects={this.state.projects}
              // projectActivities={this.state.projectActivities}
              // activities={this.state.activities} 
              // statuses={this.state.statuses}
              // toggleTaskCompleted={this.toggleTaskCompleted}
              // updateProject={this.updateProject}
              // addTaskToProject={this.addTaskToProject}
              // updateProjectActivities={this.updateProjectActivities}
            />
          </Route>

          <Route path='/create-new-project'>
            <NewProject
              statuses={this.state.statuses} 
              addProject={this.addProject} />
          </Route>
              
          <Route exact path='/activity-log'>
            <ActivityLog 
              projects={this.state.projects}
              projectActivities={this.state.projectActivities}
              activities={this.state.activities}
            />
          </Route>

          <Route exact path='/weekly-report'>
            <WeeklyReport 
              projects={this.state.projects}
              projectActivities={this.state.projectActivities} />
          </Route> 

          <Route exact path='/admin'>
            <Admin 
              statuses={this.state.statuses}
              activities={this.state.activities}
              taskTemplates={this.state.taskTemplates}
              updateValues={this.updateValues}
            />
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

