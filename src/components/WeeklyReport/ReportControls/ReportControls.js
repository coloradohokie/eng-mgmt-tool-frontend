import React from 'react'
import Form from 'react-bootstrap/Form'
import moment from 'moment'

const reportControls = (props) => (
    <div>
        <Form.Group controlId="startDate">
            <Form.Label>From</Form.Label>
            <Form.Control type="date" name="startDate" value={moment(props.startDate).format("YYYY-MM-DD")} onChange={props.handleDateChange} />
        </Form.Group>

        <Form.Group controlId="endDate">
            <Form.Label>To</Form.Label>
            <Form.Control type="date" name="endDate" value={moment(props.endDate).format("YYYY-MM-DD")} onChange={props.handleDateChange} />
        </Form.Group>
    </div>
)

export default reportControls