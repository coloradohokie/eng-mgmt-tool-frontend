import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

const projectProgress = (props) => {
    const numTasks = props.project.tasks.length
    if (props.project.tasks.length === 0) {
        return null
    } else {
        let count=0
        props.project.tasks.map(task => task.done ? count++ : count)
        const progressAmount = Math.round(count/numTasks * 100)
        return(
            <ProgressBar 
                style={{width: "90px", marginTop: "20px"}} 
                now={progressAmount} 
                label={`${progressAmount}%`} />
        )
    }
}

export default projectProgress