import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Moment from 'react-moment'
import CurrencyFormat from 'react-currency-format'
import classes from './ProjectInformation.module.scss'
import { updateObject } from '../../../../store/utility'

class ProjectInformation extends Component {
   
    state = {
        projectInformationValues: [],
        editing: false,
        loaded: false
    }

    renderProjectInformationRow = (name, value, fieldType) => {
        if (!this.state.editing) {
            if (fieldType === 'date-field' && value) {
                let fieldValue = <Moment format="MMM DD">{value}</Moment>
                if (value === " ") { 
                    fieldValue = null
                } 
                return (
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>
                            {fieldValue}
                        </td>
                    </tr>
                )
            } else if (fieldType === 'money-field' && value)  {
                return(
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>{<CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                    </tr>
                )
            } else {
                return(
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>{value}</td>
                    </tr>
                )
            }
        } else {
            if (fieldType === 'date-field' && value) {
                return (
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>
                            {<Form.Control type="date" size="sm" name={name} value={value} onChange={this.handleChange} />}
                        </td>
                    </tr>
                )
            } else if (fieldType === 'money-field' && value)  {
                return(
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>
                            $<input type="text" name={name} value={value} onChange={this.handleChange} />
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr key={name}>
                        <td>{name}</td>
                        <td className={fieldType}>
                            <input type="text" name={name} value={value} onChange={this.handleChange} />
                        </td>
                    </tr>
                )
            }
        }
    }

    addProjectInformationToProject = () => {
        this.state.projectInformationValues.map( info => {
            switch (info.name) {
                case "Budget":
                    return this.props.project.budget = info.value
                case "Contract Date":
                    return this.props.project.contract_date = info.value
                case "ST Contract Received":
                    return this.props.project.st_contract_received_date = info.value
                case "Trusses Received":
                    return this.props.project.trusses_received_date = info.value
                case "Framing Due":
                    return this.props.project.framing_due_date = info.value
                case "Foundation Due":
                    return this.props.project.foundation_due_date = info.value
                case "Email from DWG Received":
                    return this.props.project.email_from_dwg_received_date = info.value
                case "Contract Proposal Sent Date":
                    return this.props.project.contract_proposal_sent_date = info.value
                case "Ready to be Invoiced Date":
                    return this.props.project.ready_to_be_invoiced_date = info.value
                default: return null
            }
        })
        this.props.updateProject(this.props.project)
    }

    toggleEditButton = () => {
        if (this.state.editing) {
            this.addProjectInformationToProject()
            this.setState({editing: false})
        } else {
            this.setState({editing: true})
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        let newState = this.state.projectInformationValues
        let newValue = newState.find(info => info.name === name)
        newValue.value = (newValue.fieldType === 'money-field') ? +value : value
        updateObject(newState, newValue)
        this.setState({projectInformationValues: newState})
    }

    loadInitialValues() {
        if (this.props.project.id && !this.state.loaded) {

                const projectInfoArray = [
                    {name: "Budget", value: this.props.project.budget, fieldType: "money-field" },
                    {name: "Contract Date", value: this.props.project.contract_date, fieldType: "date-field"},
                    {name: "ST Contract Received", value: this.props.project.st_contract_received_date, fieldType: "date-field"},
                    {name: "Trusses Received", value: this.props.project.trusses_received_date, fieldType: "date-field"},
                    {name: "Framing Due", value: this.props.project.framing_due_date, fieldType: "date-field"},
                    {name: "Foundation Due", value: this.props.project.foundation_due_date, fieldType: "date-field"},
                    {name: "Email from DWG Received", value: this.props.project.email_from_dwg_received_date, fieldType: "date-field"},
                    {name: "Contract Proposal Sent Date", value: this.props.project.contract_proposal_sent_date, fieldType: "date-field"},
                    {name: "Ready to be Invoiced Date", value: this.props.project.ready_to_be_invoiced_date, fieldType: "date-field"}
                ]
        
                projectInfoArray.forEach(info => {if (info.value === null && info.fieldType === "date-field") info.value = " "})
        
                this.setState({
                    loaded: true,
                    projectInformationValues: projectInfoArray 
                })    
        }
    }

    render() {
        this.loadInitialValues()
        return(
            <div className={classes.ProjectInformation}>
                <div className={classes.ProjectInformationHeader}>                            
                    <h2>Project Information </h2>
                    <Button size='sm' variant="secondary" onClick={this.toggleEditButton} >{this.state.editing ? "Done" : "Edit"} </Button>
                </div>
    
                <div className={classes.ProjectInformationBody}>
                    <Table striped bordered hover size="sm" className={classes.ProjectInformationTable}>
                        <tbody>
                            {this.state.projectInformationValues.map( info => this.renderProjectInformationRow(info.name, info.value, info.fieldType))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default ProjectInformation