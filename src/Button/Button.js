import React, { Component } from 'react'
import './Button.css';

class Button extends Component {
    render() {
        return (
            <div className="container">
               <button className="main-btn" >Owned Vault</button>
               <button className="main-btn" >Recorded Vault</button>
            </div>
        )
    }
}

export default Button;