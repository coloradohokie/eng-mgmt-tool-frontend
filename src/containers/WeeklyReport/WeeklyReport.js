import React, { Component } from 'react'
import ReportControls from '../../components/WeeklyReport/ReportControls/ReportControls'
import Moment from 'react-moment'
import Table from 'react-bootstrap/Table'
import ActivityItem from '../../components/ProjectList/ProjectItem/ActivityTable/ActivityItem/ActivityItem'
import Card from 'react-bootstrap/Card'
import ProjectProgress from '../../components/UI/ProjectProgress/ProjectProgress'
import classes from './WeeklyReport.module.scss'
import moment from 'moment'
import { connect } from 'react-redux'

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
                return (<p className={classes.NoInformation}>No completed tasks in the specified time period.</p>)
            }
            return (
                <Table striped bordered hover size="sm" className={classes.ActivityLogTable}>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {project.tasks.map( task =>  this.taskCompletedText(task))}                    
                    </tbody>
                </Table>
            )
        }

        const displayActivitySection = (project) => {
            if (!this.props.projectActivities.find(activity => (
                    (activity.project_id === project.id) &&
                    moment(activity.activity_date).isSameOrAfter(this.state.startDate) &&
                    moment(activity.activity_date).isSameOrBefore(this.state.endDate)
                    ))) {
                return (<p className={classes.NoInformation}>No logged activity in the specified time period.</p>)
            }  

            return (
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
                            <Card.Title> {displayTitle} </Card.Title>
                            <Card.Subtitle> {project.project_description}. </Card.Subtitle> 
                            <ProjectProgress project={project} />
                            <h2>Newly Completed Tasks</h2>
                            {displayTaskSection(project)}
                            <h2>New Activity</h2>
                            {displayActivitySection(project)}
                        </Card.Body>
                    </Card>
                )
            }
            return null            
        })
    }

    render() {
        return (
            <div className={classes.WeeklyReport}>
                <h1>Weekly Report</h1>
                <ReportControls startDate={this.state.startDate} endDate={this.state.endDate} handleDateChange={this.handleDateChange} />
                {this.displayProjects()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        projectActivities: state.projects.projectActivities
    }
}


export default connect(mapStateToProps)(WeeklyReport)
