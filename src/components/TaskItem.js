import React from 'react'

export default function TaskItem(props) {
    console.log(props)
    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td>{props.name}</td>
        </tr>
    )
}
