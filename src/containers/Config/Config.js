import React, { Component } from 'react'
import classes from './Config.module.scss'
import ConfigValueTable from '../../components/ConfigValueTable/ConfigValueTable'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Config extends Component {
    state = {
        stateChecked: false
    }

    loadState() {
        if (this.props.statuses.length === 0) this.props.onFetchValues('statuses')
        if (this.props.taskTemplates.length === 0) this.props.onFetchValues('task_templates')
        if (this.props.activities.length === 0) this.props.onFetchValues('activities')
        this.setState({stateChecked: true})
    }

    render() {
        if (!this.state.stateChecked && (!this.props.statuses.length || !this.props.taskTemplates.length || !this.props.activities.length)) this.loadState()

        return (
            <div className={classes.ConfigTable}>
                <h1>System Configuration</h1>
                <div>
                    <ConfigValueTable title="Task Templates" values={this.props.taskTemplates} updateValues={this.props.onUpdateValues} />
                    <ConfigValueTable title="Project Statuses" values={this.props.statuses} updateValues={this.props.onUpdateValues} />
                    <ConfigValueTable title="Activity Values" values={this.props.activities} updateValues={this.props.onUpdateValues} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskTemplates: state.config.taskTemplates,
        statuses: state.config.statuses,
        activities: state.config.activities
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchValues: (endpoint) => dispatch(actions.fetchValues(endpoint)),
        onUpdateValues: (title, updatedValue) => dispatch(actions.updateValues(title, updatedValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)
