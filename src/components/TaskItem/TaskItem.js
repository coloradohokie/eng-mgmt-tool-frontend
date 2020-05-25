import React from 'react'
import unchecked from '../../assets/checkboxes/unchecked_box.png'
import checked from '../../assets/checkboxes/checked_box.png'
import classes from './TaskItem.module.css'

const taskItem = (props) => {

    const handleClick = (event) => {
        props.toggleTaskCompleted(props.id)
    }

    if (props.completed) {
        const attachedClasses = [classes.TaskItem, classes.Done]
        return (
            <tr className={classes.Task} onClick={handleClick}>
                <td>{ <img src={checked} height="24" width="24" alt="" />}</td>
                <td className={attachedClasses.join(' ')}>{props.task.name}</td>
            </tr>
        )
    }
    else {
        return(
            <tr className={classes.Task} onClick={handleClick}>
                <td><img src={unchecked} height="24" width="24" alt="" /></td>
                <td className={classes.TaskItem}>{props.task.name}</td>
            </tr>
        )
    }
}

export default taskItem