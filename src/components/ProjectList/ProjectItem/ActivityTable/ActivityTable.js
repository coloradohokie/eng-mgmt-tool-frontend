import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import ActivityItem from './ActivityItem/ActivityItem'
import classes from './ActivityTable.module.css'

class ActivityTable extends Component {
    state = {
        projectActivities: [],
        showAddActivity: false,
        notes: "",
        activityTypeId: 0
    }

    static getDerivedStateFromProps(props, state) {
        return(
            {projectActivities: props.projectActivities}
        )
    }

    showActivities = (id) => {
        this.state.projectActivities.sort(function (a,b) {return b.id - a.id})
        return (
            this.state.projectActivities.map(activity => activity.project_id === id ? 
                 <ActivityItem key={activity.id} activity={activity} /> : null
            )                
        )
    }

    getActivityOptions = () => {
        return this.props.activities.map(activity => {
            return (
            <option value={activity.id}>{activity.value}</option>
            )
        })
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitActivityInformation = () => {
        const newActivity = {
            activity_id: this.state.activityTypeId,
            project_id: this.props.project.id,
            activity_date: new Date(),
            notes: this.state.notes,
            important: false,
            archived: false
        }

        fetch('http://localhost:3000/project_activities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newActivity)
        })
            .then(response => response.json())
            .then(response => this.props.updateProjectActivities(response))

        this.setState({
            showAddActivity: false,
            notes: "",
            activityTypeId: 0
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
                        <Moment />
                    </td>
                    <td>
                        {this.props.project.address1}
                    </td>
                    <td>
                        <textarea name="notes" value={this.state.notes} onChange={this.inputHandler} />
                    </td>
                </tr>
                <tr>
                    <td colSpan="4"><button onClick={this.submitActivityInformation}>Add</button></td>
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
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {this.showActivities(this.props.project.id)}
                        {this.addActivityRow()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ActivityTable