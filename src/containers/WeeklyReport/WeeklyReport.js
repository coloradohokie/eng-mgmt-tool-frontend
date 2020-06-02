import React, { Component } from 'react'
import ReportControls from '../../components/WeeklyReport/ReportControls/ReportControls'
import Moment from 'react-moment'
import Table from 'react-bootstrap/Table'
import ActivityItem from '../../components/ProjectList/ProjectItem/ActivityTable/ActivityItem/ActivityItem'
import Card from 'react-bootstrap/Card'
import classes from './WeeklyReport.module.css'
import moment from 'moment'

class WeeklyReport extends Component {
    
    state = {
        startDate: "",
        endDate: ""
    }
    
    componentDidMount() {
        this.setState({
            startDate:  moment().subtract(6, 'days'),       
            endDate: moment()
        })
    }

    handleDateChange = (event) => this.setState({[event.target.name]: event.target.value})

    taskCompletedText = (task) => {
        if (task.done) {
            return (
                <tr key={task.id}>
                    <td>{task.name}</td>
                    <td><Moment format="MMM Do">{task.updated_at}</Moment></td>
                </tr>
            )
        } 
        return null
    }

    showActivities = (id) => {
        this.props.projectActivities.sort(function (a,b) {return b.id - a.id})
        return (
            this.props.projectActivities.map(activity => activity.project_id === id ? 
                 <ActivityItem key={activity.id} activity={activity} /> : null
            )                
        )
    }

    displayProjects = () => {
        const displayTaskSection = (project) => {   
            if (project.tasks.length === 0) {
                return <h2>No Completed Tasks</h2>
            }
            return (
                <div>
                    <h2>Completed Tasks</h2>
                    <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
                        <thead>
                            <th>Task</th>
                            <th>Completed</th>
                        </thead>
                        <tbody>
                            {project.tasks.map( task =>  this.taskCompletedText(task))}                    
                        </tbody>
                    </Table>
                </div>
            )
        }

        const displayActivitySection = (project) => {
            if (!this.props.projectActivities.find(activity => activity.project_id === project.id)) {
                return <h2>No Activity</h2>
            }  

            return (
                <div>
                    <h2>Activity</h2>
                    <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
                        <thead>
                            <tr>
                                <th>Activity</th>
                                <th>Date</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {this.showActivities(project.id)}
                        </tbody>
                    </Table>
                </div>
            )
        }

        return this.props.projects.map( project => {
            if (moment(project.updated_at).isSameOrAfter(this.state.startDate) && moment(project.updated_at).isSameOrBefore(this.state.endDate)) {
                const displayTitle = project.city ?
                `${project.address1}, ${project.city} \u2014 ${project.job_number}` :
                `${project.address1} \u2014 ${project.job_number}`
                
                return(
                    <Card key={project.id} className={classes.ProjectCard}>
                        <Card.Body className={classes.CardContents}>
                            <div>
                                <Card.Title> {displayTitle} </Card.Title> 
                                <Card.Text>
                                    <p>{project.project_description}.</p>
                                    {displayTaskSection(project)}
                                    {displayActivitySection(project)}
                                </Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                )
            }
            return null            
        })
    }

    render() {
        return (
            <div>
                <h1>Weekly Report</h1>
                <ReportControls startDate={this.state.startDate} endDate={this.state.endDate} handleDateChange={this.handleDateChange} />
                {this.displayProjects()}
            </div>
        )
    }
}


export default WeeklyReport
