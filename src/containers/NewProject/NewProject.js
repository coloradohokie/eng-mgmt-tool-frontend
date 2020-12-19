import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import classes from './NewProject.module.scss'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'


class NewProject extends Component {
    state = {
        jobNumber: null,
        client: "",
        status: "Open",
        address1: "",
        address2: "",
        city: "",
        projectDescription: "",
        budget: null,
        paymentMethodValue: "Credit",
        contractDate: "",
        stContractReceivedDate: "",
        trussesReceivedDate: "",
        framingDueDate: "",
        foundationDueDate: "",
        emailFromDwgReceivedDate: "",
        contractProposalSentDate: "",
        readyToBeInvoiced: false,
        readyToBeInvoicedDate: "",
        proposalTemplate: null,
        foundationTemplate: null,
        framingTemplate: null
    }

    constructor() {
        super()
        this.firstInputElementRef = React.createRef()
    }

    componentDidMount() {
        this.firstInputElementRef.current.focus()
    }

    handleChange = (event) => {
        if (event.target.type === "checkbox") {
            const {name} = event.target
            const value = event.target.checked
            this.setState({[name]:value})
        }
        else {
            const {name, value} = event.target
            this.setState({[name]:value})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addProject(this.state)
    }

    listStatusOptions = () => {
        return this.props.statuses.map( status => {
            return (
                <option key={status.id}>{status.value}</option>
            )
        })
    }


    render() {
        return(
            <div>
                <h1>Create New Project</h1>
                <div className={classes.CreateNewProjectForm}>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <Form.Row className={classes.CreateNewProjectFormRow}>
                                <Form.Group controlId="jobNumber">
                                    <Form.Label>Job Number*</Form.Label>
                                    <Form.Control 
                                        ref={this.firstInputElementRef}
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
                                    <Form.Control as="select" custom name="status" value={this.state.status} onChange={this.handleChange}>
                                        {this.listStatusOptions()}
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


                            <Form.Row className={classes.CreateNewProjectFormRow}>
                                <Form.Group controlId="budget">
                                    <Form.Label>Budget</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>$</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="number" name="budget" onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                
                                <div>
                                    <Form.Label>Payment Method: </Form.Label>
                                    <Form.Control as="select" custom name="paymentMethodValue" onChange={this.handleChange}>
                                        <option>Credit</option>
                                        <option>Cash on Delivery</option>
                                    </Form.Control>
                                </div>
                            </Form.Row>
                        </div>

                        <div>
                            <Form.Row className={classes.CreateNewProjectFormRow}>
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

                            <Form.Row className={classes.CreateNewProjectFormRow}>
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

                            <Form.Row className={classes.CreateNewProjectFormRow}>
                                <Form.Group controlId="contractProposalSentDate">
                                    <Form.Label>Contract Proposal Sent Date</Form.Label>
                                    <Form.Control type="date" name="contractProposalSentDate" onChange={this.handleChange} />
                                </Form.Group>
                                <div>
                                    <Form.Group controlId="proposalTemplate">
                                        <Form.Check type="checkbox" name="proposalTemplate" label="Proposal Template" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="foundationTemplate">
                                        <Form.Check type="checkbox" name="foundationTemplate" label="Foundation Template" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="framingTemplate">
                                        <Form.Check type="checkbox" name="framingTemplate" label="Framing Template" onChange={this.handleChange} />
                                    </Form.Group>
                                </div>

                                {/* <Form.Group controlId="contractDate">
                                    <Form.Label>Contract Date</Form.Label>
                                    <Form.Control type="date" name="contractDate" onChange={this.handleChange} />
                                </Form.Group> */}
                            </Form.Row>
                        </div>
                        
                        <div className={classes.FormExitButtons}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        statuses: state.projects.statuses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProject: (newProject) => dispatch(actions.addProject(newProject))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject)