import React from 'react'

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <a href='/' className="nav-bar-item">Project List</a>
            <a href='/create-new-project' className="nav-bar-item">Create New Project</a>
            <a href='/phone-log' className="nav-bar-item">Phone Log</a>
            <a href='/to-be-invoiced' className="nav-bar-item">To Be Invoiced</a>
            <a href='/weekly-report' className="nav-bar-item">Weekly Report</a>
        </nav>
    )
}
export default NavBar