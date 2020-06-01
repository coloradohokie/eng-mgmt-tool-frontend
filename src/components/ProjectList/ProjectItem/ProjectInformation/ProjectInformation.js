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
                info.value = " "
            }
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
                    this.props.project.budget = infoValue.value
                    break
                case "Contract Date":
                    this.props.project.contract_date = infoValue.value
                    break
                case "ST Contract Received":
                    this.props.project.st_contract_received_date = infoValue.value
                    break
                case "Trusses Received":
                    this.props.project.trusses_received_date = infoValue.value
                    break
                case "Framing Due":
                    this.props.project.framing_due_date = infoValue.value
                    break
                case "Foundation Due":
                    this.props.project.foundation_due_date = infoValue.value
                    break
                case "Email from DWG Received":
                    this.props.project.email_from_dwg_received_date = infoValue.value
                    break
                case "Contract Proposal Sent Date":
                    this.props.project.contract_proposal_sent_date = infoValue.value
                    break
                case "Ready to be Invoiced Date":
                    this.props.project.ready_to_be_invoiced_date = infoValue.value
                    break
            }
        })
        console.log("send to update project", this.props.project.id, this.props.project)
        this.props.updateProject(this.props.project.id, this.props.project)
    }

    toggleEditButton = () => {
        if (this.state.editing) {
            console.log("Done clicked")
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
                (info.fieldType === "money-field") ? info.value = +value : info.value = value;
                (info.fieldType === "date-field" && info.value === " ") ? info.value = "" : info.value = value 
            }
        })
        this.setState({projectInformationValues: newState})
        console.log("State", this.state.projectInformationValues)
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
                            {console.log("State before map", this.state.projectInformationValues)}
                            {this.state.projectInformationValues.map( info => this.renderProjectInformationRow(info.name, info.value, info.fieldType))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default ProjectInformation