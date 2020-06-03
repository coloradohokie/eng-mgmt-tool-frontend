import React from 'react'
import Moment from 'react-moment'


export default function ActivityItem(props) {

    return (
        <tr>
            <td>{props.activity.activity.value}</td>
            <td><Moment format="MMM Do, YYYY" >{props.activity.activity_date}</Moment></td>
            {props.showProject === true ? <td>{props.activity.project.address1}</td> : null }
            <td>{props.activity.notes}</td>
        </tr>
    )
}



