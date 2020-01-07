import React, { Component } from 'react'
import './termSheet.css'
import DropDownOption from '../dropdown.json'
import Header from '../Header/Header'
import axios from 'axios'
import queryString from 'query-string'

class termSheet extends Component {
    state = {
        referenceId: "",
        limit: "",
        rate: "",
        tenor: "",
        peers: ""
    }

    handleSubmit = (event) => {
        const { limit, rate, tenor,peers , referenceId } = this.state 
        event.preventDefault()

        const parsed = queryString.parse(window.location.search);

        parsed.referenceId = referenceId;
        parsed.limit = limit;
        parsed.rate = rate
        parsed.tenor = tenor
        parsed.borrowerId = peers

        const stringified = queryString.stringify(parsed);

        console.log(stringified)

        const APIURL = "http://localhost:10052/api/murabaha/issue-TermSheet"
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM Term SHEET",res.data)
        }).catch(err => {
            console.log(err.message)
        })

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    org(party) {

        var i = party.indexOf('O');
        var i2 = party.indexOf(",");
        var o = party.slice(i + 2, i2);
        return o;
    }
    render() {
        console.log("STATE", this.state)
        const { limit, rate, tenor,peers , referenceId } = this.state 
        return (
            <div>
            <Header />
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="login flexer" style={{ flexDirection: 'column' }} >
                            <h2>Issue Term Sheet</h2>

                            <input name="referenceId" placeholder="TermSheet Reference" value={referenceId} onChange={this.handleChange} type="text" />
                            
                            <input id="limit" name="limit" placeholder="Limit" value={limit} onChange={this.handleChange} type="text" />
                            <input id="rate" name="rate" placeholder="Profit Rate" value={rate} onChange={this.handleChange} type="text" />

                            <input name="tenor" placeholder="Tenor" value={tenor} onChange={this.handleChange} type="text" />
                            <br />

                            <select name="peers" value={peers} onChange={this.handleChange}>
                                {DropDownOption && DropDownOption.peers.map((item, index) => (
                                    <React.Fragment>
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

export default termSheet
