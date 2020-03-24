import React from 'react'
import Button from 'react-bootstrap/Button'

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <div className="nav-bar-item">Project List</div>
            <div className="nav-bar-item">Create New Project</div>
            <div className="nav-bar-item">Phone Log</div>
            <div className="nav-bar-item">To Be Invoiced</div>
            <div className="nav-bar-item">Weekly Report</div>
            <div>{<Button>This is a button</Button>}</div>
        </nav>
    )
}
export default NavBar