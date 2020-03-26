import React from 'react'
import unchecked from '../images/unchecked_box.png'
import checked from '../images/checked_box.png'

export default function TaskItem(props) {
    console.log(props)

    const showCheckbox = () => {
        return (
            <img src={unchecked} height="24" width="24" alt="" />
        )
    }

    const handleClick = (event) => {
        console.log(`${props.name} got clicked`)
    }

    return (
        <tr onClick={handleClick}>
            <td>{showCheckbox()}</td>
            <td className="task-item">{props.name}</td>
        </tr>
    )
}
