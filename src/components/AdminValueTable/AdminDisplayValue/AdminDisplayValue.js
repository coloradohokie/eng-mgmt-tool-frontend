import React from 'react'

const adminDisplayValue = (props) => (
        <tr>
            <td>{props.value}</td>
            <td>{props.sort_id}</td> 
            <td>{props.active ? "Yes" : "No" }</td>
        </tr>
    )

export default adminDisplayValue
