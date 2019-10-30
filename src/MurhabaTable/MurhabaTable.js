import React, { Component } from 'react'
import './MurhabaTable.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import {Link} from 'react-router-dom'
import Response from '../response.json'

class MurhabaTable extends Component {
    render() {
        console.log('RESPONSE', Response)
        return (
            <React.Fragment>
            <Button />
            <div className="flexer" style={{flexDirection:'column'}}>
                <Link to="/performa" ><button className="main-btn" style={{marginTop:'10px'}} >Issue Performa</button></Link>
                <br/>
                <h2 style={{ textAlign: 'center' }} >Owned Vault</h2>
                <div className="flexer">
                    <table className="rwd-table">
                    <thead  >
                        <tr >
                        <td>Asset</td>
                        <td>Owner</td>
                        <td>Client</td>
                        <td>Reference</td>
                        </tr>
                    </thead>
                        <tbody>
                        {Response && Response.map((item,i) => (
                           
                            <tr>
                            {console.log('MAP', item)}
                                <td data-th="Movie Title">{item.state.data.asset} </td>
                                <td data-th="Genre">{item.state.data.assetOwner}</td>
                                <td data-th="Genre">{item.state.data.client}</td>
                                <td data-th="Genre">{item.state.data.internalReference}</td>
                                <td><button className='btn-murhaba' >View</button></td>

                            </tr>
                        ))}
                           
                        </tbody></table>
                </div>

            </div>
            </React.Fragment>
        )
    }
}

export default MurhabaTable
