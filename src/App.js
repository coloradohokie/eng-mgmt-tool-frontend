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

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    activities: [],
    tasks: [],
    taskCategories: [],
    projectTasks: [],
    statusValues: [],
    activityValues: []
  }


  fetchProjects = () => {
    fetch(BASE_URL.concat("projects"))
    .then(response => response.json())
    .then(projects => this.setState({projects: projects}))
  }

  fetchActivities = () => {
    fetch(BASE_URL.concat('activities'))
    .then(response => response.json())
    .then(activities => this.setState({activities: activities}))
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
    fetch(BASE_URL.concat('status_values'))
    .then(response => response.json())
    .then(status_values => this.setState({statusValues: status_values}))
  }

  fetchTasks = () => {
    fetch(BASE_URL.concat('tasks'))
      .then(response => response.json())
      .then(tasks => this.setState({tasks: tasks}))
  }

  fetchActivityValues = () => {
    fetch(BASE_URL.concat('activity_values'))
      .then(response => response.json())
      .then(values => this.setState({activityValues: values}))
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
    fetch(BASE_URL.concat("projects"), {
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
    console.log("Add Activity", newActivity)
    fetch(BASE_URL.concat('activities'), {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newActivity)
    })
      .then(response => response.json())
      .then(activity => console.log("response from server: ", activity))
      .then(activity => {this.setState([...this.state.activities, activity])})
    window.location.href = `/item-details/${newActivity.project_id}`
  }


  // getProject = (id) => {
  //   const project = this.state.projects.find(id) //this doesnt' work!!! see ex in toggleTaskCompleted
  //   return project 
  // }
  
  toggleTaskCompleted = (task_id) => {
    const projectTask = this.state.projectTasks.find(element => element.id === task_id)
    projectTask.completed === true ? 
      projectTask.completed = false : projectTask.completed = true
    this.setState(projectTask) 
  }
  
  render() {
    return (
      <Router>
      {/* {console.log("Project Tasks", this.state.projectTasks)} */}
        <div className="App">
          <NavBar />
          <main>
            <Route exact path='/'>
              <ProjectList projects={this.state.projects}/>
            </Route>

            <Route 
              path='/item-details/:id' 
              render={(props) => <ItemDetails 
                {...props} 
                projects={(this.state.projects)} 
                activities={this.state.activities} 
                taskCategories={this.state.taskCategories}
                projectTasks={this.state.projectTasks} 
                tasks={this.state.tasks}
                toggleTaskCompleted={this.toggleTaskCompleted}
              />} 
            />

            <Route exact path='/create-new-project'>
              <CreateNewProject addProject={this.addProject} />
            </Route>
              

            <Route exact path='/phone-log'>
              <ActivityLog activities={this.state.activities}/>
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
                statusValues={this.state.statusValues}
                tasks={this.state.tasks}
              />
            </Route>

            <Route 
              path='/add-activity/:id' 
              render={(props) => <AddActivity 
                {...props} 
                addActivity={this.addActivity}
                activityValues={this.state.activityValues} 
              />} 
            />


          </main>
        </div>
      </Router>
    );
  }
}

