import React, { Component } from 'react'

export default class CreateNewProject extends Component {
    
    state = {}
    
    render() {
        return (
            <div>
                <h1>Create New Project</h1>
                <form>
                    <input name="job_number" id="job_number" placeholder="Job #" type="number" />
                    <input name="client" id="client" type="text" placeholder="Client Name" />
                    <input name="address1" id="address1" type="text" placeholder="Address" />
                    <input name="address2" id="address2" type="text" placeholder="Unit/Suite/Apt" />
                    <input name="city" id="city" type="text" placeholder="City" />
                    <input name="project_description" id="project_description" type="text" placeholder="Description" />
                    <input name="contract_date" id="contract_date" type="date" />
                    
                    <input name="payment_method_value" type ="radio" value="cash" />
                    <input name="payment_method_value" type ="radio" value="credit" />
                    <input name="payment_method_value" type ="radio" value="free" />
                    
                    <select name="status" id="status">
                        <option value="new">New</option>
                        <option value="proposed">Proposed</option>
                        <option value="open">Open</option>
                        <option value="hold">On Hold</option>
                        <option value="closed">Closed</option>
                    </select>

                    <input type="submit" value="Add Project" />
                    
                </form>
            </div>
        )
    }
}
