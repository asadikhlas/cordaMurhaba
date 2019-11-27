import React, { Component } from 'react'
import './Button.css';

class Button extends Component {
    render() {
        const { isOwnedVault, onClick } = this.props
        return (
            <div className="container">
                <button className="main-btn" onClick={isOwnedVault} >Owned Vault</button>
                <button className="main-btn" onClick={onClick} >Recorded Vault</button>
            </div>
        )
    }
}

export default Button;