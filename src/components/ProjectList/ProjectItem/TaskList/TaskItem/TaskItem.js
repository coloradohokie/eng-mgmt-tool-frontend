import React from 'react'
import unchecked from './checkboxes/unchecked_box.png'
import checked from './checkboxes/checked_box.png'
import classes from './TaskItem.module.css'

const taskItem = (props) => {
    console.log("[TaskItem]", props)

    const handleClick = (event) => {
        props.toggleTaskCompleted(props.project_id, props.id)
    }

    if (props.done) {
        const attachedClasses = [classes.TaskItem, classes.Done]
        return (
            <tr className={classes.Task} onClick={handleClick}>
                <td>{ <img src={checked} height="24" width="24" alt="" />}</td>
                <td className={attachedClasses.join(' ')}>{props.name}</td>
            </tr>
        )
    }
    else {
        return(
            <tr className={classes.Task} onClick={handleClick}>
                <td><img src={unchecked} height="24" width="24" alt="" /></td>
                <td className={classes.TaskItem}>{props.name}</td>
            </tr>
        )
    }
}

export default taskItem