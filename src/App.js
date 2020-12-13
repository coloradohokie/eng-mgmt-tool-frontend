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
import Logout from './components/Navigation/Logout/Logout'
import { AJAX } from './shared/utility'

var moment = require('moment');
moment().format();

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

  fetchProjects = async () => {
    try {
      const endpoint = 'projects'
      const response = await AJAX(endpoint)
      this.setState({
        projects: response.projects,
        projectActivities: response.project_activities,
        statuses: response.statuses,
        activities: response.activities,
        taskTemplates: response.task_templates,
      })
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount = () => {
    this.checkAuthState()
    this.fetchProjects()
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


  addTaskToProject = async (project_id, group, taskName) => {
    try {
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
      AJAX('tasks', 'POST', false , newTask)

    } catch (error) {
      console.error(error)
    }
  }

  toggleTaskCompleted = async (project_id, task_id, taskName) => {
    try {
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
      const endpoint = `tasks/${task_id}`
      await AJAX(endpoint, 'PATCH', false, projectTask)
    } catch (error) {
      console.error(error)
    }
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

  updateProject = async (project_id, updatedProject) => {
    try {
      const endpoint = `projects/${project_id}`
      await AJAX(endpoint, 'PATCH', false, updatedProject)
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
        </Switch>
      )
    }

    let returnValue = (<Auth />)
    if (this.state.isAuthenticated) {
      returnValue = (
        <Layout isAuthenticated={this.state.isAuthenticated} logout={this.logout}>
          {routes}
        </Layout>
      )
    }

    return (returnValue)
  }
}

