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
                            <h2>Issue Performa</h2>

                            <input name="ReferenceID" placeholder="ReferenceID" type="text" />
                            <input name="GoodsID" placeholder="GoodsID" type="text" />

                            <input id="pw" name="goodsdescription" placeholder="Goods Description" type="text" />
                            <input id="qty" name="quantity" placeholder="Goods quantity" type="text" />

                            <input name="amount" placeholder="Amount" type="number" />
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
                            <button type="submit" className="performa-btn">Create Performa</button>

                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default IssuePerforma;
