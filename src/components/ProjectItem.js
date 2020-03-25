import React from 'react'
import Card from 'react-bootstrap/Card'


const ProjectItem = (props) => {
    console.log("project item", props)
    const project = {...props.project}
    console.log(project)


    const detailLink = `/item-details/${project.id}`


    return(
            <Card className="item-card">
                <Card.Body>
                    <Card.Title> <a href={detailLink}> {project.address1}, {project.city} </a> </Card.Title>
                    <Card.Text>{project.project_description}</Card.Text>
                    <Card.Text>{project.status_value.value}</Card.Text>
                </Card.Body>
            </Card>
    )
}
export default ProjectItem