import React from 'react'
import classes from './FilterProjects.module.css'

const filterProjects = (props) => {

    const showFilter = () => {
        return props.filters.map( (filter, index) => (
            <label key={index} >
                <input type="checkbox" name={filter.name} checked={filter.show} onChange={() => props.toggleFilter(filter)} /> 
                {filter.name}
            </label>
        ))
    }

    return(
        <div className={classes.FilterControls}>
            <p>Filter:</p>
            {showFilter()}

        </div>
    )
}

export default filterProjects