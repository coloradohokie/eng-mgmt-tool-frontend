import React, {Component} from 'react'
import ProjectList from '../../components/ProjectList/ProjectList'
import FilterProjects from '../../components/FilterProjects/FilterProjects'
import classes from './Projects.module.css'

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

    selectedProjectList = (projects) => {
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

        return this.props.projects.filter(project => filterValues.includes(project.status.value))
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
        if (event.target.name === "selectedMethod") {
            updatedSort.selectedMethod = event.target.value 
        }
        if (event.target.name === "ascending") {
            updatedSort.ascending = updatedSort.ascending ? false : true
        }
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
                    toggleTaskCompleted={this.props.toggleTaskCompleted}
                    updateProject={this.props.updateProject}
                    addTaskToProject={this.props.addTaskToProject}
                    updateProjectActivities={this.props.updateProjectActivities}
                    />
            </div>
        )
        

    }

}

export default Projects