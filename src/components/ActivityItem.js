import React from 'react'


export default function ActivityItem(props) {

    console.log(props)
    return (
        <tr>
            <td>{props.activity.activity_value.value}</td>
            <td>{props.activity.activity_date}</td>
            <td>{props.activity.project.address1}</td>
            <td>{props.activity.notes}</td>
        </tr>
    )
}



