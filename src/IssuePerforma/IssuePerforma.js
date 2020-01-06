import React, { Component } from 'react'
import './IssuePerforma.css'
import DropDownOption from '../dropdown.json'
import Header from '../Header/Header'
import axios from 'axios'
import queryString from 'query-string'


class IssuePerforma extends Component {
    state = {
        referenceID: "",
        goodsID: "",
        goodsdescription: "",
        quantity: "",
        amount: "",
        peers: ""
    }

    handleSubmit = (event) => {
        const { peers, amount, quantity, goodsdescription, goodsID, referenceID } = this.state
        event.preventDefault()

        const parsed = queryString.parse(window.location.search);

        parsed.buyerId = peers;
        parsed.goodsDescription = goodsdescription;
        parsed.proformaId = referenceID
        parsed.goodsId = goodsID
        parsed.quantity = quantity
        parsed.price = amount; 

        const stringified = queryString.stringify(parsed);

        console.log(stringified)

        const APIURL = "http://localhost:10050/api/murabaha/create-proforma"
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM ISSUE PERFORMA",res)
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
        const { peers, amount, quantity, goodsdescription, goodsID, referenceID } = this.state

        return (
            <div>
                <Header />
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="login flexer" style={{ flexDirection: 'column' }} >
                            <h2>Issue Proforma</h2>
                            <input name="referenceID" placeholder="referenceID" value={referenceID} onChange={this.handleChange} type="text" />
                            <input name="goodsID" placeholder="goodsID" value={goodsID} onChange={this.handleChange} type="text" />
                            <input id="goodsdescription" name="goodsdescription" value={goodsdescription} onChange={this.handleChange} placeholder="Goods Description" type="text" />
                            <input id="quantity" name="quantity" value={quantity} onChange={this.handleChange} placeholder="Goods quantity" type="text" />
                            <input className="amount-input" name="amount" value={amount} onChange={this.handleChange} placeholder="Amount" type="number" />
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
                            <button type="submit" className="performa-btn">Create Proforma</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default IssuePerforma;
