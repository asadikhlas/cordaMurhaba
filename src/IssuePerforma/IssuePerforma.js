import React, { Component } from 'react'
import './IssuePerforma.css'
import DropDownOption from '../dropdown.json'

class IssuePerforma extends Component {
    render() {
        return (
            <div>
                <div>
                    <form >
                        <div className="login flexer" style={{ flexDirection: 'column' }} >
                            <h2>Issue Performa</h2>

                            <input name="ReferenceID" placeholder="ReferenceID" type="text" />
                            <input id="pw" name="goodsdescription" placeholder="Goods Description" type="text" />
                            <input name="amount" placeholder="Amount" type="number" />
                            <br />

                            <select>
                                {DropDownOption && DropDownOption.peers.map((item, index) => (
                                    <React.Fragment>
                                        {console.log(item)}
                                        <option value={item} >{ item}</option>
                                    </React.Fragment>

                                ))}
                            </select>
                            <br />
                            <br />
                            <button className="performa-btn">Create Performa</button>

                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default IssuePerforma;
