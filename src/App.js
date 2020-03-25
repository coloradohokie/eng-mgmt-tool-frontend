import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import NavBar from './components/NavBar'
import ProjectList from './components/ProjectList'
import ItemDetails from './components/ItemDetails'
import ActivityLog from './components/ActivityLog'
import CreateNewProject from './components/CreateNewProject'

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: [],
    activities: []
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
  
  componentDidMount = () => {
    this.fetchProjects()
    this.fetchActivities()
  }

  getProject = (id) => {
    const project = this.state.projects.find(id)
    console.log(project)
    return project 
    // this.state.projects.find(id)
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
                render={(props) => <ItemDetails {...props} projects={(this.state.projects)} />} 
              />

              <Route exact path='/create-new-project'>
                <CreateNewProject />
              </Route>
                

              <Route exact path='/phone-log'>
                <ActivityLog activities={this.state.activities}/>
              </Route>
            </main>
          </div>
        {/* </Switch> */}
      </Router>
    );
  }
}

