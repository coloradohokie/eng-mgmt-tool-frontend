import React from 'react'

export default function AdminDisplayValue(props) {
    console.log("admin display value", props)
    return (
        <tr>
            <td>{props.value}</td>
            <td>{props.sort_id}</td> 
            <td>{props.active ? "Yes" : "No" }</td>
        </tr>
    )
}
