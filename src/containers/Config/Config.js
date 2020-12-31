import React, { Component } from 'react'
import classes from './Config.module.scss'
import ConfigValueTable from '../../components/ConfigValueTable/ConfigValueTable'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Config extends Component {

    // state = {
    //     taskTemplates: [],
    //     statuses: [],
    //     activities: []
    // }

    // static getDerivedStateFromProps(props, state) {
    //     return {
    //         taskTemplates: props.taskTemplates,
    //         statuses: props.statuses,
    //         activities: props.activities
    //     }
    // }

    render() {
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
        onUpdateValues: (title, updatedValue) => dispatch(actions.updateValues(title, updatedValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)
