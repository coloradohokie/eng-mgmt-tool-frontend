import React from 'react'

export default function ItemDetails(props) {

    var project = props.projects.find(element => element.id === parseInt(props.match.params.id))
    console.log("project = ", project )
    const {id, job_number, address1} = {project}
    console.log(id, job_number, address1)

    return (
        <div>
            <h1>Project Details</h1>
            {/* <p>{project.id}</p> */}

            
        </div>
    )
}
