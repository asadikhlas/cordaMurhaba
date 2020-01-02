import React, { Component } from 'react'
import './IssuePerforma.css'
import DropDownOption from '../dropdown.json'
import Header from '../Header/Header'
class IssuePerforma extends Component {
    state = {
        ReferenceID:"",
        GoodsID:"",
        goodsdescription:"",
        quantity:"",
        amount:"",
        peers:""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

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
                            <h2>Issue Proforma</h2>
                            <input name="ReferenceID" placeholder="ReferenceID" onChange={this.handleChange}  type="text" />
                            <input name="GoodsID" placeholder="GoodsID" onChange={this.handleChange} type="text" />
                            <input id="goodsdescription" name="goodsdescription" onChange={this.handleChange} placeholder="Goods Description" type="text" />
                            <input id="quantity" name="quantity" onChange={this.handleChange} placeholder="Goods quantity" type="text" />
                            <input className="amount-input" name="amount" onChange={this.handleChange} placeholder="Amount" type="number" />
                            <br />
                            <select name="peers" onChange={this.handleChange}>
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
