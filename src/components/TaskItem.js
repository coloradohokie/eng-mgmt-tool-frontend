import React from 'react'

export default function TaskItem(props) {
    console.log(props.name)
    return (
        <tr>
            <td><input type="checkbox" /></td>
            <td>{props.name}</td>
        </tr>
    )
}
