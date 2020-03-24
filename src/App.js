import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import ProjectList from './components/ProjectList'
import ItemDetails from './components/ItemDetails'
import ActivityLog from './components/ActivityLog'

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
  
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <main>
            <Route exact path='/'>
              <ProjectList projects={this.state.projects}/>
            </Route>

            <Route exact path='/item-details'>
              <ItemDetails />
            </Route>

            <Route exact path='/phone-log'>
              <ActivityLog activities={this.state.activities}/>
            </Route>
          </main>
        </div>
      </Router>
    );
  }
}

