import React from 'react'
import Table from 'react-bootstrap/Table'
import ActivityItem from '../../components/ProjectList/ProjectItem/ActivityTable/ActivityItem/ActivityItem' 

const activityLog = (props) => {
    
    const showActivities = () => {
        props.activities.sort(function (a,b) {return b.id - a.id})
        return (props.activities.map(activity => <ActivityItem key={activity.id} activity={activity} /> ))
    }


    return (
        <div>
            <h1>Phone Log</h1>
            <Table striped bordered hover style={{backgroundColor: "#FFF"}}>
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

export default activityLog