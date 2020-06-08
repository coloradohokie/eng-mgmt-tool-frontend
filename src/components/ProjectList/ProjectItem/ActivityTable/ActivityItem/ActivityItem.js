import React from 'react'
import Moment from 'react-moment'


export default function ActivityItem(props) {
    console.log(props)



    return (
        <tr>
            <td>{props.activityName}</td>
            <td><Moment format="MMM Do, YYYY" >{props.activity.activity_date}</Moment></td>
            {props.showProject === true ? <td>{props.projectAddress}</td> : null }
            <td>{props.activity.notes}</td>
        </tr>
    )
}



