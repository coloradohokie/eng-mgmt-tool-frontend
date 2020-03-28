import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'


const ProjectItem = (props) => {
    const project = {...props.project}
    const detailLink = `/item-details/${project.id}`
    const cardTitleLine = project.city ? 
        <Card.Title> <a href={detailLink}> {project.address1}, {project.city} &mdash; {project.job_number} </a> </Card.Title> :
        <Card.Title> <a href={detailLink}> {project.address1} &mdash; {project.job_number} </a> </Card.Title>


    return(
            <Card className="item-card">
                <Card.Body className="card-contents">
                    <div className="card-main-box">
                        {cardTitleLine}
                        <Card.Text>{project.project_description}</Card.Text>
                    </div>
                    <div className="card-right-side-panel">
                        <Card.Text><Badge className="status-badge" variant="light">{project.status.value}</Badge></Card.Text>
                    </div>
                </Card.Body>
            </Card>
    )
}
export default ProjectItem