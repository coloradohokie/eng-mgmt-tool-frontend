import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class CreateNewProject extends Component {
   
    state = {
        jobNumber: null,
        client: "",
        status: "",
        address1: "",
        address2: "",
        projectDescription: "",
        budget: null,
        paymentMethodValue: "",
        contractDate: "",
        stContractReceivedDate: "",
        trussesReceivedDate: "",
        framingDueDate: "",
        foundationDueDate: "",
        emailFromDwgReceivedDate: "",
        contractProposalSentDate: "",
        readyToBeInvoiced: false,
        readyToBeInvoicedDate: ""
    }

    handleChange = (event) => {
        const {name, value} = event.target
        console.log(event.target)
        console.log("name ", name, "value ", value)
        // const value = (name === "urgent" ? event.target.checked : event.target.value)
        this.setState({[name]:value})
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        // this.props.addProject(this.state)
    }

    
    render() {
        return (
            <div>
                <h1>Create New Project</h1>
                <div className="create-new-project-form">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="jobNumber">
                                <Form.Label>Job Number*</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Job #" 
                                    name="jobNumber" 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="client">
                                <Form.Label>Client</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="client"
                                    placeholder="Client Name" 
                                    onChange={this.handleChange} 
                                />
                            </Form.Group>

                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" custom name="status" onChange={this.handleChange}>
                                    <option>Proposed</option>
                                    <option>Open</option>
                                    <option>On Hold</option>
                                    <option>Closed</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        <Form.Group controlId="address1">
                            <Form.Label>Project Address</Form.Label>
                            <Form.Control type="text" name="address1" placeholder="Street Address*" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="address2">
                            <Form.Control type="text" name="address2" placeholder="Unit/Apt/Suite" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Control type="text" name="city" placeholder="City" onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="projectDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name="projectDescription" placeholder="Project description..." onChange={this.handleChange} />
                        </Form.Group>


                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="budget">
                                <Form.Label>Budget</Form.Label>
                                <Form.Control type="number" name="budget" placeholder="$" onChange={this.handleChange} />
                            </Form.Group>
                            
                            <div>
                                <Form.Label>Payment Method: </Form.Label>
                                <Form.Check inline type='radio' name="paymentMethodValue" id={`Cash on Delivery`} label={`Cash on Delivery`} onChange={this.handleChange} />
                                <Form.Check inline type='radio' name="paymentMethodValue" id={`Credit`} label={`Credit`} onChange={this.handleChange} />
                                <Form.Check inline type='radio' name="paymentMethodValue" id={`free`} label={`Free`} onChange={this.handleChange} />
                            </div>
                        </Form.Row>



                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="contractDate">
                                <Form.Label>Contract Date</Form.Label>
                                <Form.Control type="date" name="contractDate" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="stContractReceivedDate">
                                <Form.Label>St Contract Received</Form.Label>
                                <Form.Control type="date" name="stContractReceivedDate" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="trussesReceivedDate">
                                <Form.Label>Trusses Received</Form.Label>
                                <Form.Control type="date" name="trussesReceivedDate" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="framingDueDate">
                                <Form.Label>Framing Due Date</Form.Label>
                                <Form.Control type="date" name="framingDueDate" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="foundationDueDate">
                                <Form.Label>Foundation Due Date</Form.Label>
                                <Form.Control type="date" name="foundationDueDate" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="emailFromDwgReceivedDate">
                                <Form.Label>Email from DWG Received</Form.Label>
                                <Form.Control type="date" name="emailFromDwgReceivedDate" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="contractProposalSentDate">
                                <Form.Label>Contract Proposal Sent Date</Form.Label>
                                <Form.Control type="date" name="contractProposalSentDate" onChange={this.handleChange} />
                            </Form.Group>

                            {/* <Form.Group controlId="contractDate">
                                <Form.Label>Contract Date</Form.Label>
                                <Form.Control type="date" name="contractDate" onChange={this.handleChange} />
                            </Form.Group> */}
                        </Form.Row>

                        <Form.Row>
                            <Form.Group id="readyToBeInvoiced">
                                <Form.Check type="checkbox" name="readyToBeInvoiced" label="Ready to be Invoiced" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="readyToBeInvoicedDate">
                                <Form.Control type="date" name="readyToBeInvoicedDate" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>


                    </Form>

                </div>
            </div>
        )
    }
}
