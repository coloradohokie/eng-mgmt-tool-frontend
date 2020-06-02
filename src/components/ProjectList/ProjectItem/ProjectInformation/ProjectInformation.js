import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Moment from 'react-moment'
import CurrencyFormat from 'react-currency-format'
import classes from './ProjectInformation.module.css'

class ProjectInformation extends Component {
   
    state = {
        projectInformationValues: [],
        editing: false
    }
    componentDidMount() {
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

        projectInfoArray.map(info => {
            if (info.value === null && info.fieldType === "date-field") {
                return info.value = " "
            } return null
        })

        this.setState({projectInformationValues: projectInfoArray})
    }

    renderProjectInformationRow = (name, value, fieldType) => {
        if (!this.state.editing) {
            if (fieldType === 'date-field' && value) {
                let fieldValue = <Moment format="MMM DD">{value=value}</Moment>
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
        this.state.projectInformationValues.map( infoValue => {
            switch (infoValue.name) {
                case "Budget":
                    return this.props.project.budget = infoValue.value
                case "Contract Date":
                    return this.props.project.contract_date = infoValue.value
                case "ST Contract Received":
                    return this.props.project.st_contract_received_date = infoValue.value
                case "Trusses Received":
                    return this.props.project.trusses_received_date = infoValue.value
                case "Framing Due":
                    return this.props.project.framing_due_date = infoValue.value
                case "Foundation Due":
                    return this.props.project.foundation_due_date = infoValue.value
                case "Email from DWG Received":
                    return this.props.project.email_from_dwg_received_date = infoValue.value
                case "Contract Proposal Sent Date":
                    return this.props.project.contract_proposal_sent_date = infoValue.value
                case "Ready to be Invoiced Date":
                    return this.props.project.ready_to_be_invoiced_date = infoValue.value
            } return null
        })
        this.props.updateProject(this.props.project.id, this.props.project)
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
        newState.map( info => {
            if (info.name === name) {
                if (info.fieldType === "money-field") { info.value = +value }
                else if (info.fieldType === "date-field" && info.value === " ") { info.value = "" }
                else {info.value = value }
            }
            return info.value
        })
        this.setState({projectInformationValues: newState})
    }

    render() {
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