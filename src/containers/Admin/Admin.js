import React, { Component } from 'react'
import classes from './Admin.module.css'
import AdminValueTable from '../../components/AdminValueTable/AdminValueTable'

const BASE_URL = `http://localhost:3000/`

class Admin extends Component {

    state = {
        taskTemplates: [],
        statuses: [],
        activities: []
    }


    fetchTaskTemplates = () => {
        fetch(BASE_URL.concat('task_templates'))
            .then(response => response.json())
            .then(task_templates => this.setState({taskTemplates: task_templates}))
    }

    updateValues = (valueList, newValue) => {
        if (valueList === "Task Templates") {
            this.setState([...this.state.taskTemplates, newValue])
        }
        if (valueList === "Project Statuses") {
            this.setState([...this.state.statuses, newValue])
        }
        if (valueList === "Activity Values") {
            this.setState([...this.state.activities, newValue])
        }
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
      this.setState({
          statuses: this.props.statuses,
          activities:this.props.activities
        })
  }

    render() {
        return (
            <div>
                <h1>System Administration</h1>
                <div className={classes.AdminTableHeader}>
                    <AdminValueTable title="Task Templates" values={this.state.taskTemplates} updateValues={this.updateValues} />
                    <AdminValueTable title="Project Statuses" values={this.props.statuses} updateValues={this.updateValues} />
                    <AdminValueTable title="Activity Values" values={this.props.activities} updateValues={this.updateValues} />
                </div>
            </div>
        )
    }
}

export default Admin
