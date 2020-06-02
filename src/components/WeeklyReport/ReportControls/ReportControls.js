import React from 'react'
import Form from 'react-bootstrap/Form'

const reportControls = (props) => {


    
    return(
        <div>
            <Form.Group controlId="startDate">
                <Form.Label>From</Form.Label>
                <Form.Control type="date" name="startDate" value={props.startDate} onChange={props.handleDateChange} />
            </Form.Group>

            <Form.Group controlId="endDate">
                <Form.Label>To</Form.Label>
                <Form.Control type="date" name="endDate" value={props.endDate} onChange={props.handleDateChange} />
            </Form.Group>
        </div>
    )
}

export default reportControls