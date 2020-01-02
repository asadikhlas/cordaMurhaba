import React, { Component } from 'react'
import './IssuePerforma.css'
import DropDownOption from '../dropdown.json'
import Header from '../Header/Header'
class IssuePerforma extends Component {
    org(party) {

        var i = party.indexOf('O');
        var i2 = party.indexOf(",");
        var o = party.slice(i + 2, i2);
        return o;
    }
    render() {
        return (
            <div>
            <Header />
                <div>
                    <form >
                        <div className="login flexer" style={{ flexDirection: 'column' }} >
                            <h2>Issue Term Sheet</h2>

                            <input name="ReferenceID" placeholder="TermSheet Reference" type="text" />
                            
                            <input id="limit" name="limit" placeholder="Limit" type="text" />
                            <input id="rate" name="rate" placeholder="Profit Rate" type="text" />

                            <input name="amount" placeholder="Tenor" type="text" />
                            <br />

                            <select>
                                {DropDownOption && DropDownOption.peers.map((item, index) => (
                                    <React.Fragment>
                                        {console.log(item)}
                                        <option value={item} >{this.org(item)}</option>
                                    </React.Fragment>

                                ))}
                            </select>
                            <br />
                            <br />
                            <button type="submit" className="performa-btn">Issue Termsheet</button>

                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default IssuePerforma;
