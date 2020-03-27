import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class AddActivity extends Component {

    formatDate = (d) => {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
        return (`${ye}-${mo}-${da}`)
    }
    

    state = {
        activity: "Phone Call",
        notes: "",
        activity_date: this.formatDate(new Date())
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    getActivityId = (activityName) => {
        const selectedActivity = this.props.activityValues.find(value => value.value === activityName)
        return selectedActivity.id
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.props.addActivity(
            {
                activity_value_id: this.getActivityId(this.state.activity) ,
                project_id: this.props.match.params.id,
                activity_date: this.state.activity_date,
                notes: this.state.notes,
                important: false,
                archived: false
            })
    }


    render() {
        console.log(this.props)
        console.log(this.props.match.params.id)
        return (
            <div>
                <h1>Add Activity</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="activity">
                        <Form.Label>Activity</Form.Label>
                        <Form.Control as="select" custom name="activity" onChange={this.handleChange}>
                            <option>Phone Call</option>
                            <option>Internal Note</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows="3" name="notes" placeholder="Enter notes..." onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                            Submit
                        </Button>

                </Form>
                
            </div>
        )
    }
}
