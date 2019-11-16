import React, { Component } from 'react'
import './Button.css';

class Button extends Component {
    render() {
        const { isRecordedTrue, isOwnedVault } = this.props
        return (
            <div className="container">
                <button className="main-btn" onClick={isOwnedVault} >Owned Vault</button>
                <button className="main-btn" onClick={isRecordedTrue} >Recorded Vault</button>
            </div>
        )
    }
}

export default Button;