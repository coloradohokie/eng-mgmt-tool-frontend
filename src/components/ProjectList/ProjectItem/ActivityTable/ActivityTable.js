import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import ActivityItem from '../../../ActivityItem/ActivityItem'
import classes from './ActivityTable.module.css'

const activityTable = (props) => {

    const addActivityUrl = `../add-activity/${props.project.id}`

    const showActivities = (id) => {
        props.projectActivities.sort(function (a,b) {return b.id - a.id})
        return (
            props.projectActivities.map(activity => activity.project_id === id ? 
                 <ActivityItem key={activity.id} activity={activity} /> : null
            )                
        )
    }

    return(
        <div className={classes.ActivitySection}>
            <div className={classes.ActivitySectionHeader}>
                <h2>Activity Log </h2>
                <h3>
                    <a href={addActivityUrl}>
                        <Badge variant="secondary">Add Activity</Badge>
                    </a>
                </h3>
            </div>

            <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Date</th>
                        <th>Project</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>
                    {showActivities(props.project.id)}
                </tbody>
            </Table>
        </div>
    )
}

export default activityTable