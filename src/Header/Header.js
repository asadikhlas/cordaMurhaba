import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    render() {
        return (
            <header>
                <span style={{padding:'20px'}}>Project IJMA POC</span>
                <span>Seller Name</span>
            </header>
        )
    }
}

export default Header;
