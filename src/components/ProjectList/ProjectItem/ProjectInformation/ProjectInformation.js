import React from 'react'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import Moment from 'react-moment'
import CurrencyFormat from 'react-currency-format'
import classes from './ProjectInformation.module.css'

const projectInformation = (props) => {
    const project = props.project

    const renderProjectInformationRow = (name, value, clas) => {
        if (clas === 'date-field' && value) {
            return (
                <tr>
                <td>{name}</td>
                <td className={clas}><Moment format="MMM. DD">{value}</Moment></td>
            </tr>
            )
        } else if (clas === 'money-field' && value)  {
            return(
                <tr>
                    <td>{name}</td>
                    <td className={clas}>{<CurrencyFormat value={value} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                </tr>
            )
        } else {
            return(
                <tr>
                    <td>{name}</td>
                    <td className={clas}>{value}</td>
                </tr>
            )
        }
    }

    return(
        <div className={classes.ProjectInformation}>
            <div className={classes.ProjectInformationHeader}>                            
                    <h2>Project Information </h2>
                        <a href={`../create-new-project`}>
                            <Badge variant="secondary">Edit</Badge>
                        </a>
            
            </div>
            <div className={classes.ItemDetailsTaskSectionBody}>
                <Table striped bordered hover size="sm" className={classes.ProjectInformationTable}>
                    <tbody>
                        {renderProjectInformationRow("Budget",props.project.budget,"money-field")}
                        {renderProjectInformationRow("Contract Date",project.contract_date,"date-field")}
                        {renderProjectInformationRow("ST Contract Received",project.st_contract_received_date,"date-field")}
                        {renderProjectInformationRow("Trusses Received",project.trusses_received_date,"date-field")}
                        {renderProjectInformationRow("Framing Due",project.framing_due_date,"date-field")}
                        {renderProjectInformationRow("Foundation Due",project.foundation_due_date,"date-field")}
                        {renderProjectInformationRow("Contract Date",project.contract_date,"date-field")}
                        {renderProjectInformationRow("Email from DWG Received",project.email_from_dwg_received_date,"date-field")}
                        {renderProjectInformationRow("Contract Proposal Sent Date",project.contract_proposal_sent_date,"date-field")}
                        {renderProjectInformationRow("Ready to be Invoiced Date",project.ready_to_be_invoiced_date,"date-field")}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default projectInformation