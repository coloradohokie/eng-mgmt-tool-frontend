import React from 'react'
import classes from './FilterProjects.module.scss'

const filterProjects = (props) => {

    const showFilter = () => {
        return props.filters.map( (filter, index) => (
            <li key={index} >
                <label>
                    <input type="checkbox" name={filter.name} checked={filter.show} onChange={() => props.toggleFilter(filter)} /> 
                    {filter.name}
                </label>
            </li>
        ))
    }

    return(
        <div className={classes.FilterBox}>
            <h3>Filter:</h3>
            <ul className={classes.FiltersList}>
                {showFilter()}
            </ul>

        </div>
    )
}

export default filterProjects