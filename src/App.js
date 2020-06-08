import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'

import Projects from './containers/Projects/Projects'
import ActivityLog from './containers/ActivityLog/ActivityLog'
import NewProject from './containers/NewProject/NewProject'
import WeeklyReport from './containers/WeeklyReport/WeeklyReport'
import Admin from './containers/Admin/Admin'
import Layout from './components/Layout/Layout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

var moment = require('moment');
moment().format();

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    projectActivities: [],
    statuses: [],
    activities: [],
    taskTemplates: [],
    isAuthenticated: false
  }

  constructor(props) {
    super()
    this.checkAuthState()
  }

  fetchProjects = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return null
    }
      fetch(BASE_URL.concat("projects"), {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},

      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          projects: response.projects,
          projectActivities: response.project_activities,
          statuses: response.statuses,
          activities: response.activities,
          taskTemplates: response.task_templates,
        })
      })
  }

  componentDidMount = () => {
    this.checkAuthState()
    this.fetchProjects()
  }

  checkAuthState = () => {
    console.log("checkAuthState called")
    const token = localStorage.getItem('token')
    if (!token) {
        console.log("No Token")
        this.logout()
    } else {
        const expirationDate = localStorage.getItem('expirationDate')
        if (expirationDate < new Date()) {
            console.log("Token expired")
            this.logout()

        } else {
            console.log("Authenticated")
            const userId = localStorage.getItem('userId')
            this.setState({isAuthenticated: true})

        }
    }
  }

  logout = () => {
    console.log("Logout Called")
    this.setState({isAuthenticated: false})
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }


  addTaskToProject = (project_id, group, taskName) => {
      const newTask = {
        name: taskName,
        project_id: project_id,
        template_name: group,
        active: true,
        done: false
      }
      const selectedProject = this.state.projects.find(project => project.id === project_id)
      selectedProject.tasks.push(newTask)
      selectedProject.last_action = `${taskName} task added to project`
      this.setState(selectedProject)
      this.updateProject(project_id, selectedProject)
      // this.setState(selectedProject.projectTasks)

      fetch(BASE_URL.concat(`tasks`), {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
      })
        .then(response => response.json)
  }

  toggleTaskCompleted = (project_id, task_id, taskName) => {
      const selectedProject = this.state.projects.find(project => project.id === project_id)
      const projectTask = selectedProject.tasks.find(element => element.id === task_id)
      if (projectTask.done === true) { 
        projectTask.done = false
        selectedProject.last_action = `${taskName} task marked not completed`
      } else {
        projectTask.done = true
        selectedProject.last_action = `${taskName} task marked completed`
      }
      this.setState(selectedProject)
      this.updateProject(project_id, selectedProject)
      this.setState(projectTask)
      fetch(BASE_URL.concat(`tasks/${task_id}`), {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(projectTask)
      }) 
  }

  addProject = (newProject) => {
    fetch(BASE_URL.concat("projects"), {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newProject)
      })
      .then(response => response.json())
      .then(project => {this.setState({projects: [...this.state.projects, project]})})
    window.location.href = "/"
  }

  updateProject = (project_id, updatedProject) => {
    console.log("SENT TO SERVER", updatedProject)
    fetch(`http://localhost:3000/projects/${project_id}`, {
      method: 'PATCH',
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(updatedProject)
  })
      .then(response => response.json())
      .then(response => console.log("SERVER RESPONSE", response))

  }
  

  addActivity = (newActivity) => {
    fetch(BASE_URL.concat('project_activities'), {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newActivity)
    })
      .then(response => response.json())
      .then(activity => {this.setState([...this.state.projectActivities, activity])})
    window.location.href = `/item-details/${newActivity.project_id}`
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

  updateProjectActivities = (newValue) => {
    this.setState({projectActivities: [...this.state.projectActivities, newValue]})
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
              projects={this.state.projects}
              projectActivities={this.state.projectActivities}
              activities={this.state.activities} 
              statuses={this.state.statuses}
              toggleTaskCompleted={this.toggleTaskCompleted}
              updateProject={this.updateProject}
              addTaskToProject={this.addTaskToProject}
              updateProjectActivities={this.updateProjectActivities}
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
          <Route exact path='/logout'>
            <Logout logout={this.logout} />
          </Route>
          
        </Switch>
      )
    }

    let returnValue = (<Auth />)
    if (this.state.isAuthenticated) {
      returnValue = (
        <Layout isAuthenticated={this.state.isAuthenticated}>
          {routes}
        </Layout>
      )
    }

    console.log(this.state.isAuthenticated)
    return (returnValue)
  }
}

