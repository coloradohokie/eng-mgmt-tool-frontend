import React from 'react'
import Table from 'react-bootstrap/Table'
import ActivityItem from './ActivityItem' 

export default function ActivityLog(props) {
    
    const showActivities = () => {
        return (props.activities.map(activity => <ActivityItem key={activity.id} activity={activity} /> ))
    }


    return (
        <div>
            <h1>Phone Log</h1>
            <Table striped bordered hover className="activity-log-table">
                <thead>
                    <tr>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Project</th>
                    <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {showActivities()}
                </tbody>
            </Table>
        </div>
    )
}
