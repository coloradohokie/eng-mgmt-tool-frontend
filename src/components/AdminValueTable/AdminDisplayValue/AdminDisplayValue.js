import React from 'react'

export default function AdminDisplayValue(props) {
    const value = (props.name && !props.value) ? props.name : props.value

    return (
        <tr>
            <td>{value}</td>
            <td>{props.sort_id}</td> 
            <td>{props.active ? "Yes" : "No" }</td>
        </tr>
    )
}
