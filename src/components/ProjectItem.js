import React from 'react'
import Card from 'react-bootstrap/Card'

import ItemDetails from './ItemDetails'

const ProjectItem = (props) => {
    console.log("project item", props)
    const project = {...props.project}
    console.log(project)

    const handleClick = (event) => {
        console.log(`${project.id} got clicked`)
        return (<ItemDetails project={project} />)

    }


    return(
            <Card className="item-card" onClick={handleClick}>
                <Card.Body>
                    <Card.Title>{project.address1}, {project.city}</Card.Title>
                    <Card.Text>{project.project_description}</Card.Text>
                </Card.Body>
            </Card>
    )
}
export default ProjectItem