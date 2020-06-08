import React from 'react'
import Table from 'react-bootstrap/Table'
import ActivityItem from '../../components/ProjectList/ProjectItem/ActivityTable/ActivityItem/ActivityItem' 

const activityLog = (props) => {

    const getProjectAddress = (projectId) => {
        return props.projects.find( project => project.id === projectId).address1
    }

    const getActivityName = (activityId) => {
        return props.activities.find( activity => activity.id === activityId ).value
    }
    
    const showActivities = () => {
        props.projectActivities.sort(function (a,b) {return b.id - a.id})
        console.log(props)
        return (props.projectActivities.map(activity => <ActivityItem key={activity.id} activity={activity} activityName={getActivityName(activity.activity_id)} projectAddress={getProjectAddress(activity.project_id)} showProject /> ))
    }


    return (
        <div>
            <h1>Activity Log</h1>
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