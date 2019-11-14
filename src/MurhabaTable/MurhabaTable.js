import React, { Component } from 'react'
import './MurhabaTable.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import {Link} from 'react-router-dom'
import Response from '../response.json'
import axios from 'axios'

class MurhabaTable extends Component {

    state = {
        goodsData: []
    }
    componentWillMount(){
        axios.get('http://localhost:10051/api/murabaha/goods', {
                headers: {
                    'Content-Type': 'application/json'
                }
        }).then(response => {
            this.setState({goodsData: response.data})
        }).catch(err => {
            console.log(err.message)
        })
    }
    
    render() {
        const {goodsData} = this.state
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
                        {goodsData && goodsData.map((item,i) => (
                           
                            <tr>
                                <td data-th="Movie Title">{item.state.data.asset} </td>
                                <td data-th="Genre">{item.state.data.assetOwner}</td>
                                <td data-th="Genre">{item.state.data.quantity}</td>
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
