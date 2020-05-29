import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import classes from './Admin.module.css'
import AdminValueTable from '../../components/AdminValueTable/AdminValueTable'

const BASE_URL = `http://localhost:3000/`

class Admin extends Component {

    state = {
        taskTemplates: []
    }


    fetchTaskTemplates = () => {
        fetch(BASE_URL.concat('task_templates'))
            .then(response => response.json())
            .then(task_templates => this.setState({taskTemplates: task_templates}))
    }

//   fetchStatusValues = () => {
//     fetch(BASE_URL.concat('statuses'))
//     .then(response => response.json())
//     .then(statuses => this.setState({statuses: statuses}))
//   }

//   fetchActivityValues = () => {
//     fetch(BASE_URL.concat('activities'))
//       .then(response => response.json())
//       .then(activities => this.setState({activities: activities}))
//   }
  
  componentDidMount() {
    //   this.fetchStatusValues()
    //   this.fetchActivityValues()
      this.fetchTaskTemplates()
  }

    render() {
        return (
            <div>
                <h1>System Administration</h1>
                <div className={classes.AdminTableHeader}>
                    <AdminValueTable title="Task Templates" values={this.state.taskTemplates} />
                    <AdminValueTable title="Project Statuses" values={this.props.statuses} />
                    <AdminValueTable title="Activity Values" values={this.props.activities} />
                </div>
            </div>
        )
    }
}

export default Admin
