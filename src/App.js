import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar'
import ProjectList from './components/ProjectList'
import ItemDetails from './components/ItemDetails'
import ActivityLog from './components/ActivityLog'
import CreateNewProject from './components/CreateNewProject'
import ToBeInvoiced from './components/ToBeInvoiced'
import WeeklyReport from './components/WeeklyReport'

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    activities: [],
    taskCategories: []
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
  
  componentDidMount = () => {
    this.fetchProjects()
    this.fetchActivities()
    this.fetchTaskCategories()
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


  getProject = (id) => {
    const project = this.state.projects.find(id)
    console.log(project)
    return project 
  }
  
  render() {
    return (
      <Router>
        {/* <Switch> */}
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


            </main>
          </div>
        {/* </Switch> */}
      </Router>
    );
  }
}

