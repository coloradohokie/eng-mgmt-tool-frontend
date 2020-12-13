import React from 'react'
import Form from 'react-bootstrap/Form'
import classes from './ReportControls.module.scss'
import moment from 'moment'

const reportControls = (props) => (
    <div className={classes.ReportControls}>
        <Form.Group controlId="startDate" className={classes.DateControlGroup}>
            <Form.Label style={{paddingRight: "5px"}}>From:</Form.Label>
            <Form.Control type="date" name="startDate" value={moment(props.startDate).format("YYYY-MM-DD")} onChange={props.handleDateChange} />
        </Form.Group>

        <Form.Group controlId="endDate" className={classes.DateControlGroup}>
            <Form.Label style={{paddingRight: "5px"}}>To: </Form.Label>
            <Form.Control type="date" name="endDate" value={moment(props.endDate).format("YYYY-MM-DD")} onChange={props.handleDateChange} />
        </Form.Group>
    </div>
)

export default reportControls