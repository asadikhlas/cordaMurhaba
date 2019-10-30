import React, { Component } from 'react'
import './MurhabaTable.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import {Link} from 'react-router-dom'

class MurhabaTable extends Component {
    render() {
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
                        <td>Item 1</td>
                        <td>Item 2</td>
                        <td>Item 3</td>
                        <td>Item 4</td>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td data-th="Movie Title">Star Wars</td>
                                <td data-th="Genre">Adventure, Sci-fi</td>
                                <td data-th="Genre">Adventure, Sci-fi</td>
                                <td data-th="Genre">Adventure, Sci-fi</td>
                                <td><button className='btn-murhaba' >View</button></td>

                            </tr>
                            <tr>
                                <td data-th="Movie Title">Howard The Duck</td>
                                <td data-th="Genre">"Comedy"</td>
                                <td data-th="Genre">"Comedy"</td>
                                <td data-th="Genre">"Comedy"</td>
                                <td><button className='btn-murhaba' >View</button></td>

                            </tr>
                        </tbody></table>
                </div>

            </div>
            </React.Fragment>
        )
    }
}

export default MurhabaTable
