import React, { Component } from 'react'
import './IssuePerforma.css'
import Header from '../Header/Header'

class IssuePerforma extends Component {
    render() {
        return (
            <div>
                <div>
                    <div className="login flexer" style={{flexDirection:'column'}} >
                        <h2>Issue Performa</h2>
                        <input name="ReferenceID" placeholder="ReferenceID" type="text" />
                        <input id="pw" name="goodsdescription" placeholder="Goods Description" type="text" />
                        <input name="amount" placeholder="Amount" type="number" />
                       <br/>
                       <br/>
                        <button className="performa-btn">Create Performa</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default IssuePerforma;
