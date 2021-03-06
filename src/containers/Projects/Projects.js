import React, {Component} from 'react'
import ProjectList from '../../components/ProjectList/ProjectList'
import FilterProjects from '../../components/FilterProjects/FilterProjects'
import classes from './Projects.module.scss'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Projects extends Component {

    state = {
        filters: [
            {name: "Proposed", show: true},
            {name: "Open", show: true},
            {name: "On Hold", show: true},
            {name: "To Be Invoiced", show: true},
            {name: "Completed", show: true},
            {name: "Archived", show: false}
        ],
        sort: {
            methods: ["Job Number", "Address", "City", "Status"],
            selectedMethod: "Status",
            ascending: true
        }        
    }

    componentDidMount() {
        this.props.onFetchProjects()
    }

    toggleTaskCompleted = async (taskId) => {
        try {
            const projectTask = this.props.selectedProject.tasks.find(element => element.id === taskId)
            const lastAction = projectTask.done ? 
                `${projectTask.name} task marked not completed` :
                `${projectTask.name} task marked completed`
            console.log(projectTask)
            this.props.onToggleTask(projectTask)
            this.props.onUpdateLastAction(lastAction)
            
        } catch (error) {
            console.error(error)
        }
    }

    selectedProjectList = () => {
        const filterValues = []
        this.state.filters.map( filter => {
            if (filter.show) {
                return filterValues.push(filter.name)
            }
            return null
        })
        if (filterValues === []) {
            console.log("No filters selected")
        }
        if (this.props.projects) {
            return this.props.projects.filter(project => filterValues.includes(project.status.value))
        }
        return null
    }

    toggleFilter = (filter) => {
        if (filter.show) {
            filter.show = false
        } else {
            filter.show = true
        }
        let updatedFilters = this.state.filters
        updatedFilters.map( updatedFilter => {
            if (updatedFilter.name === filter.name) {
                return updatedFilter.show = filter.show 
            }
            return null
        })
        this.setState({filters: updatedFilters})
    }

    sortProjects = () => {
        return(
            <div className={classes.sortControls}>
                <label>
                    Sort By:
                    <select name="selectedMethod" value={this.state.sort.selectedMethod} onChange={this.handleChange}>
                        {this.state.sort.methods.map( (method, index) => (<option key={index} value={method}>{method}</option>))}
                    </select>
                </label>
                <button name="ascending" onClick={this.handleChange}>Toggle Sort</button>
            </div>
        )
    }

    handleChange = (event) => {
        let updatedSort = this.state.sort
        if (event.target.name === "selectedMethod") updatedSort.selectedMethod = event.target.value 
        if (event.target.name === "ascending") updatedSort.ascending = !updatedSort.ascending
        this.setState({sort: updatedSort})
    }

    render() {
        return (
            <div className={classes.Projects}>
                <div className={classes.Controls}>
                    <FilterProjects filters={this.state.filters} toggleFilter={this.toggleFilter} />
                    {this.sortProjects()}
                </div>
                <ProjectList 
                    projects={this.selectedProjectList(this.props.projects)}
                    sort={this.state.sort}
                    projectActivities={this.props.projectActivities}
                    activities={this.props.activities} 
                    statuses={this.props.statuses}
                    toggleTaskCompleted={this.toggleTaskCompleted}
                    updateProject={this.props.onUpdateProject}
                    addTaskToProject={this.props.onAddTaskToProject}
                    updateProjectActivities={this.props.onUpdateProjectActivities}
                    addProjectActivity={this.props.onAddProjectActivity}
                    fetchProjectDetails={this.props.onFetchProjectDetails}
                    clearSelectedProject={this.props.onClearSelectedProject}
                    selectedProject={this.props.selectedProject}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        projectActivities: state.projects.projectActivities,
        statuses: state.config.statuses,
        activities: state.config.activities,
        selectedProject: state.projects.selectedProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjects: () => dispatch(actions.fetchProjects()),
        onFetchProjectDetails: (id) => dispatch(actions.fetchProjectDetails(id)),
        onClearSelectedProject: () => dispatch(actions.clearSelectedProject()),
        onUpdateProject: (updatedProject) => dispatch(actions.updateProject(updatedProject)),
        onToggleTask: (task) => dispatch(actions.toggleTask(task)),
        onUpdateProjectActivities: (newValue) => dispatch(actions.updateProjectActivities(newValue)),
        onAddTaskToProject: (taskName, projectId, group) => dispatch(actions.addTaskToProject(taskName, projectId, group)),
        onAddProjectActivity: (projectActivity) => dispatch(actions.addProjectActivity(projectActivity)),
        onUpdateLastAction: (lastAction) => dispatch(actions.updateLastAction(lastAction))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)