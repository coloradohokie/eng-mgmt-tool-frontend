import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Switch, Route} from 'react-router-dom'

import Projects from './containers/Projects/Projects'
import ActivityLog from './containers/ActivityLog/ActivityLog'
import NewProject from './containers/NewProject/NewProject'
import ToBeInvoiced from './containers/ToBeInvoiced/ToBeInvoiced'
import WeeklyReport from './containers/WeeklyReport/WeeklyReport'
import Admin from './containers/Admin/Admin'
import AddActivity from './components/AddActivity'
import Layout from './components/Layout/Layout'

var moment = require('moment');
moment().format();

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    projectActivities: [],
    statuses: [],
    activities: []
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

  // fetchTaskCategories = () => {
  //   fetch(BASE_URL.concat('task_categories'))
  //   .then(response => response.json())
  //   .then(task_categories => this.setState({taskCategories: task_categories}))
  // }

  // fetchProjectTasks = () => {
  //   fetch(BASE_URL.concat('project_tasks'))
  //   .then(response => response.json())
  //   .then(project_tasks => this.setState({projectTasks: project_tasks}))
  // }

  fetchStatusValues = () => {
    fetch(BASE_URL.concat('statuses'))
    .then(response => response.json())
    .then(statuses => this.setState({statuses: statuses}))
  }

  // fetchTasks = () => {
  //   fetch(BASE_URL.concat('tasks'))
  //     .then(response => response.json())
  //     .then(tasks => this.setState({tasks: tasks}))
  // }

  fetchActivityValues = () => {
    fetch(BASE_URL.concat('activities'))
      .then(response => response.json())
      .then(activities => this.setState({activities: activities}))
  }
  
  componentDidMount = () => {
    this.fetchProjects()
    this.fetchActivities()
    // this.fetchTaskCategories()
    // this.fetchProjectTasks()
    this.fetchStatusValues()
    // this.fetchTasks()
    this.fetchActivityValues()
  }


toggleTaskCompleted = (project_id, task_id) => {
    const selectedProject = this.state.projects.find(project => project.id === project_id)
    const projectTask = selectedProject.tasks.find(element => element.id === task_id)
    projectTask.done === true ? 
      projectTask.done = false : projectTask.done = true
    this.setState(projectTask)
    fetch(BASE_URL.concat(`tasks/${task_id}`), {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(projectTask)
    }) 
}

addProject = (newProject) => {
  fetch(BASE_URL.concat("project_tasks"), {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newProject)
    })
    .then(response => response.json())
    .then(project => console.log("response from server: ", project))
    .then(project => {this.setState([...this.state.projects, project])})
  window.location.href = "/"
}

changeStatus = (status_id, project_id) => {
    const project = this.state.projects.find(element => element.id === project_id)
    project.status_id = parseInt(status_id)
    this.setState(project)
    fetch(BASE_URL.concat(`projects/${project_id}`), {
        method: 'PATCH',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(project)
    })
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

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Projects
              projects={this.state.projects}
              projectActivities={this.state.projectActivities} 
              statuses={this.state.statuses}
              toggleTaskCompleted={this.toggleTaskCompleted}
              changeStatus={this.changeStatus}
            />
          </Route>

          <Route exact path='/create-new-project'>
            <NewProject addProject={this.addProject} />
          </Route>
              
          <Route exact path='/phone-log'>
            <ActivityLog activities={this.state.projectActivities}/>
          </Route>

          <Route exact path='/to-be-invoiced'>
            <ToBeInvoiced projects={this.state.projects} />
          </Route>

          <Route exact path='/weekly-report' component={WeeklyReport} />

          <Route exact path='/admin'>
            <Admin 
              taskCategories={this.state.taskCategories}
              statusValues={this.state.statuses}
              tasks={this.state.tasks}
            />
          </Route>

          <Route 
            path='/add-activity/:id' 
            render={(props) => <AddActivity 
              {...props} 
              addActivity={this.addActivity}
              activityValues={this.state.activities} 
            />}
          /> 
        </Switch>
      </Layout>
    );
  }
}

