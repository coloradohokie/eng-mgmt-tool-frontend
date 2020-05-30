import React, { Component } from 'react'
import classes from './Admin.module.css'
import AdminValueTable from '../../components/AdminValueTable/AdminValueTable'

class Admin extends Component {

    state = {
        taskTemplates: [],
        statuses: [],
        activities: []
    }

    static getDerivedStateFromProps(props, state) {
        return {
            taskTemplates: props.taskTemplates,
            statuses: props.statuses,
            activities: props.activities
        }
    }

    render() {
        return (
            <div>
                <h1>System Administration</h1>
                <div className={classes.AdminTableHeader}>
                    <AdminValueTable title="Task Templates" values={this.state.taskTemplates} updateValues={this.props.updateValues} />
                    <AdminValueTable title="Project Statuses" values={this.state.statuses} updateValues={this.props.updateValues} />
                    <AdminValueTable title="Activity Values" values={this.state.activities} updateValues={this.props.updateValues} />
                </div>
            </div>
        )
    }
}

export default Admin
