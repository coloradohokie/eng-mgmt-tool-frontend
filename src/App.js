import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import ProjectList from './components/ProjectList'
import ItemDetails from './components/ItemDetails'
import ActivityLog from './components/ActivityLog'
import CreateNewProject from './components/CreateNewProject'
import ToBeInvoiced from './components/ToBeInvoiced'
import WeeklyReport from './components/WeeklyReport'
import Admin from './components/Admin'
import AddActivity from './components/AddActivity'

var moment = require('moment');
moment().format();

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    projectActivities: [],
    tasks: [],
    taskCategories: [],
    projectTasks: [],
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

  fetchTaskCategories = () => {
    fetch(BASE_URL.concat('task_categories'))
    .then(response => response.json())
    .then(task_categories => this.setState({taskCategories: task_categories}))
  }

  fetchProjectTasks = () => {
    fetch(BASE_URL.concat('project_tasks'))
    .then(response => response.json())
    .then(project_tasks => this.setState({projectTasks: project_tasks}))
  }

  fetchStatusValues = () => {
    fetch(BASE_URL.concat('statuses'))
    .then(response => response.json())
    .then(statuses => this.setState({statuses: statuses}))
  }

  fetchTasks = () => {
    fetch(BASE_URL.concat('tasks'))
      .then(response => response.json())
      .then(tasks => this.setState({tasks: tasks}))
  }

  fetchActivityValues = () => {
    fetch(BASE_URL.concat('activities'))
      .then(response => response.json())
      .then(activities => this.setState({activities: activities}))
  }
  
  componentDidMount = () => {
    this.fetchProjects()
    this.fetchActivities()
    this.fetchTaskCategories()
    this.fetchProjectTasks()
    this.fetchStatusValues()
    this.fetchTasks()
    this.fetchActivityValues()
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

  
  toggleTaskCompleted = (task_id) => {
    const projectTask = this.state.projectTasks.find(element => element.id === task_id)
    projectTask.completed === true ? 
      projectTask.completed = false : projectTask.completed = true
    this.setState(projectTask)
    fetch(BASE_URL.concat(`project_tasks/${task_id}`), {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(projectTask)
    }) 
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <main>
            <Route exact path='/'>
              <ProjectList 
                projects={this.state.projects}
                projectActivities={this.state.projectActivities} 
                taskCategories={this.state.taskCategories}
                projectTasks={this.state.projectTasks} 
                tasks={this.state.tasks}
                toggleTaskCompleted={this.toggleTaskCompleted}

              />
            </Route>


            <Route exact path='/create-new-project'>
              <CreateNewProject addProject={this.addProject} />
            </Route>
              

            <Route exact path='/phone-log'>
              <ActivityLog activities={this.state.projectActivities}/>
            </Route>

            <Route exact path='/to-be-invoiced'>
              <ToBeInvoiced projects={this.state.projects} />
            </Route>

            <Route exact path='/weekly-report'>
              <WeeklyReport />
            </Route>

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
          </main>
        </div>
      </Router>
    );
  }
}

