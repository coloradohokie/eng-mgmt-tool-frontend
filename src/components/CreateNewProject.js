import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class CreateNewProject extends Component {
    
    state = {}
    
    render() {
        return (
            <div>
                <h1>Create New Project</h1>
                <div className="create-new-project-form">
                    <Form>
                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="jobNumber">
                                <Form.Label>Job Number*</Form.Label>
                                <Form.Control type="number" placeholder="Job #" />
                            </Form.Group>

                            <Form.Group controlId="client">
                                <Form.Label>Client</Form.Label>
                                <Form.Control type="text" placeholder="Client Name" />
                            </Form.Group>

                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Proposed</option>
                                    <option>Open</option>
                                    <option>On Hold</option>
                                    <option>Closed</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        <Form.Group controlId="address1">
                            <Form.Label>Project Address</Form.Label>
                            <Form.Control type="text" placeholder="Street Address*" />
                        </Form.Group>

                        <Form.Group controlId="address2">
                            <Form.Control type="text" placeholder="Unit/Apt/Suite" />
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Control type="text" placeholder="City" />
                        </Form.Group>

                        <Form.Group controlId="projectDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Project description..." />
                        </Form.Group>


                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="budget">
                                <Form.Label>Budget</Form.Label>
                                <Form.Control type="number" placeholder="$" />
                            </Form.Group>
                            
                            <div>
                                <Form.Label>Payment Method: </Form.Label>
                                <Form.Check inline type='radio' name="payment_method_value" id={`cash`} label={`Cash`} />
                                <Form.Check inline type='radio' name="payment_method_value" id={`credit`} label={`Credit`} />
                                <Form.Check inline type='radio' name="payment_method_value" id={`free`} label={`Free`} />
                            </div>
                        </Form.Row>



                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="contractDate">
                                <Form.Label>Contract Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="stContractReceivedDate">
                                <Form.Label>St Contract Received</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="trussesReceivedDate">
                                <Form.Label>Trusses Received</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="framingDueDate">
                                <Form.Label>Framing Due Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="foundationDueDate">
                                <Form.Label>Foundation Due Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="emailFromDwgReceivedDate">
                                <Form.Label>Email from DWG Received</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="create-new-project-form-row">
                            <Form.Group controlId="contractProposalSentDate">
                                <Form.Label>Contract Proposal Sent Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>

                            <Form.Group controlId="contractDate">
                                <Form.Label>Contract Date</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group id="readyToBeInvoiced">
                                <Form.Check type="checkbox" label="Ready to be Invoiced" />
                            </Form.Group>

                            <Form.Group controlId="readyToBeInvoicedDate">
                                <Form.Control type="date" />
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
