import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import { AJAX } from '../../../../shared/utility'
import ActivityItem from './ActivityItem/ActivityItem'
import classes from './ActivityTable.module.scss'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

class ActivityTable extends Component {
    state = {
        projectActivities: [],
        showAddActivity: false,
        notes: "",
        activityTypeId: 0,
    }

    static getDerivedStateFromProps(props, state) {
        return(
            {projectActivities: props.projectActivities}
        )
    }

    getActivityName = (activityId) => {
        return this.props.activities.find( activity => activity.id === activityId ).value
    }

    showActivities = (id) => {
        this.props.projectActivities.sort(function (a,b) {return b.id - a.id})
        return (
            this.props.projectActivities.map(activity => activity.project_id === id ? 
                 <ActivityItem key={activity.id} activity={activity} activityName={this.getActivityName(activity.activity_id)} /> : null
            )                
        )
    }

    getActivityOptions = () => {
        return this.props.activities.map(activity => {
            return (
            <option key={activity.id} value={activity.id}>{activity.value}</option>
            )
        })
    }

    inputHandler = (event) => {
        if (event.target.name === 'notes' && event.target.value.length > 500) return
        this.setState({[event.target.name]: event.target.value})
    }

    submitActivityInformation = async () => {
        const newActivity = {
            activity_id: this.state.activityTypeId,
            project_id: this.props.project.id,
            activity_date: new Date(),
            notes: this.state.notes,
            important: false,
            archived: false
        }
        this.props.addProjectActivity(newActivity)
        this.setState({
            showAddActivity: false,
            notes: "",
            activityTypeId: 0,
        })
    }

    addActivityRow = () => {
        if (this.state.showAddActivity) {
            return(
                <>
                <tr>
                    <td>
                        <select name="activityTypeId" value={this.state.activityTypeId} onChange={this.inputHandler}>
                            {this.getActivityOptions()}
                        </select>
                    </td>
                    <td>
                        <Moment format="MMM Do, YYYY"/>
                    </td>
                    <td style={{textAlign: "right"}}>
                        <textarea style={{width: "100%", height: "150px"}} name="notes" placeholder={"500 characters max."} value={this.state.notes} onChange={this.inputHandler} />
                        <button style={{display: "inline-block"}} onClick={this.submitActivityInformation}>Add</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="4"></td>
                </tr>
                </>
            )
        }
        return null
    }

    addActivityClicked = () => {
        this.setState({showAddActivity: true})
    }

    componentDidMount() {
        this.setState({activityTypeId: this.props.activities.find(activity => activity.value === "Phone Call").id})
    }

    render() {
        return(
            <div className={classes.ActivitySection}>
                <div className={classes.ActivitySectionHeader}>
                    <h2>Activity Log </h2>
                    <Button size='sm' variant="secondary" onClick={() => this.addActivityClicked()}>Add Activity</Button>
                </div>
    
                <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
                    <thead>
                        <tr>
                            <th style={{width: "150px"}}>Activity</th>
                            <th style={{width: "150px"}}>Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {this.addActivityRow()}
                        {this.showActivities(this.props.project.id)}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectActivities: state.projects.projectActivities
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
        
//     }
// }

export default connect(mapStateToProps)(ActivityTable)