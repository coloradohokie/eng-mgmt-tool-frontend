import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Switch, Route} from 'react-router-dom'

import Projects from './containers/Projects/Projects'
import ActivityLog from './containers/ActivityLog/ActivityLog'
import NewProject from './containers/NewProject/NewProject'
import WeeklyReport from './containers/WeeklyReport/WeeklyReport'
import Admin from './containers/Admin/Admin'
import Layout from './components/Layout/Layout'

var moment = require('moment');
moment().format();

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    projectActivities: [],
    statuses: [],
    activities: [],
    taskTemplates: []
  }


  fetchProjects = () => {
      fetch(BASE_URL.concat("projects"))
      .then(response => response.json())
      .then(projects => this.setState({projects: projects}))
  }

  fetchActivities = () => {
    fetch(BASE_URL.concat('project_activities'))
    .then(response => response.json())
    .then(project_activities => this.setState({projectActivities: project_activities}))
  }

  fetchStatusValues = () => {
    fetch(BASE_URL.concat('statuses'))
    .then(response => response.json())
    .then(statuses => this.setState({statuses: statuses}))
  }

  fetchActivityValues = () => {
    fetch(BASE_URL.concat('activities'))
      .then(response => response.json())
      .then(activities => this.setState({activities: activities}))
  }

  fetchTaskTemplates = () => {
    fetch(BASE_URL.concat('task_templates'))
      .then(response => response.json())
      .then(taskTemplates => this.setState({taskTemplates: taskTemplates}))
  }
    
  componentDidMount = () => {
    this.fetchProjects()
    this.fetchActivities()
    this.fetchStatusValues()
    this.fetchActivityValues()
    this.fetchTaskTemplates()
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
    return (
      <Layout>
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
            <ActivityLog activities={this.state.projectActivities}/>
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
      </Layout>
    );
  }
}

