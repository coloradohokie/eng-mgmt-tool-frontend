import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ProjectList from './components/ProjectList'
import NavBar from './components/NavBar'

const BASE_URL = `http://localhost:3000/`


export default class App extends React.Component {
  
  state = {
    projects: []
  }


  fetchProjects = () => {
    fetch(BASE_URL.concat("projects"))
    .then(response => response.json())
    .then(projects => this.setState({projects: projects}))
  }
  
  componentDidMount = () => {
    this.fetchProjects()
  }
  
  render() {
    return (
      <div className="App">
        <NavBar />
        <ProjectList projects={this.state.projects}/>
      </div>
    );
  }
}

