import React, { Component } from 'react'
import './Header.css'
import {withRouter} from 'react-router-dom'
import Logo from '../Assets/IjmaLogo.png'

class Header extends Component {
    render() {
        return (
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flexer" style={{padding:'8px'}}>
                <img src={Logo} height="70px" className="ml-5" alt="Logo" />
                <h4 className="m-0" style={{color:'white', fontWeight:'bold'}} >IJMA</h4>
            </div>
                {/* <span style={{ padding: '20px' }}>Project IJMA POC</span> */}
                <div>
                    <a onClick={()=>this.props.history.push('/')}> Owned Vault</a> 
                    <a className="ml-3" onClick={()=>this.props.history.push('/sellerRecordedVault')} >Recorded Vault</a>
                    <a className="ml-3" onClick={()=>this.props.history.push('/performa')}>Issue Performa</a>
                </div>
                <span>Seller Name</span>
            </header>
        )
    }
}

export default withRouter(Header);
