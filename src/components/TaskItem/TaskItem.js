import React from 'react'
import unchecked from '../../assets/checkboxes/unchecked_box.png'
import checked from '../../assets/checkboxes/checked_box.png'

export default function TaskItem(props) {

    const handleClick = (event) => {
        props.toggleTaskCompleted(props.id)
    }

    if (props.completed) {
        return (
            <tr className="task" onClick={handleClick}>
                <td>{ <img src={checked} height="24" width="24" alt="" />}</td>
                <td className="task-item done">{props.task.name}</td>
            </tr>
        )
    }
    else {
        return(
            <tr className="task" onClick={handleClick}>
                <td><img src={unchecked} height="24" width="24" alt="" /></td>
                <td className="task-item">{props.task.name}</td>
            </tr>
        )
    }
}
