import React, { Component } from 'react'
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
//import GoodsResponse from '../response.json';
import { Modal } from 'react-bootstrap';
import proformas from '../performaResponse.json'
import murabahaAgreement from '../Murabaha.json'
import purchaseOrder from '../purchaseOrderPerforma.json'
import { Tabs } from 'antd';
import Header from '../Header/Header';
import DropDownOption from '../dropdown.json'
import axios from 'axios'
import queryString from 'query-string'
const { TabPane } = Tabs;


class BorrowerDashboard extends Component {
    state = {
        isProformaModal: false,
        currentObj: {},
        isRecordedTrue: false,
        isGoodsModal: false,
        isMurabahaModal: false,
        term:"",
        peers:"",
        proformas: [],
        GoodsResponse:[]
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    callback = (key) => {
        console.log(key);
    }


    isRecordedTrue = () => this.setState({ isRecordedTrue: true })

    isOwnedVault = () => this.setState({ isRecordedTrue: false })

    org(party) {

        var i = party.indexOf('O');
        var i2 = party.indexOf(",");
        var o = party.slice(i + 2, i2);
        return o;
    }
    componentDidMount(){

        const proformaAPI = "http://localhost:10051/api/murabaha/my-proformas"
        axios.get(`${proformaAPI}`).then(res => {
            this.setState({proformas:res.data})
            console.log("RESPONSE FROM MY PROFORMAS API",res)
        }).catch(err => {
            console.log(err.message)
        })
            const goodsAPI = "http://localhost:10051/api/murabaha/my-goods"
        axios.get(`${goodsAPI}`).then(res => {
            this.setState({GoodsResponse:res.data})
            console.log("RESPONSE FROM MY GOODS API",res)
        }).catch(err => {
            console.log(err.message)
       
        })
        
    
    }

    handleRedeem = (referenceId) => {// for GOODS TO REDEEM
        console.log("GOODSID", referenceId)

        const parsed = queryString.parse(window.location.search);

              parsed.goodsId=referenceId;
     
       
       const stringified = queryString.stringify(parsed);
       const APIURL = "http://localhost:10051/api/murabaha/redeem"
       axios.get(`${APIURL}?${stringified}`).then(res => {
           console.log("RESPONSE FROM REDEEM",res)
       }).catch(err => {
           console.log(err.message)
       })
    }
    handleApplication = (referenceId) => {
        const { isProformaModal, currentObj, isRecordedTrue, isGoodsModal, isMurabahaModal, term, peers } = this.state

        console.log("PROFORMA ID", referenceId)

        const parsed = queryString.parse(window.location.search);

        parsed.bank=peers;
        parsed.proforma=referenceId;
        parsed.term=term;
        
        const stringified = queryString.stringify(parsed);
        console.log(stringified)

        const APIURL = "http://localhost:10051/api/murabaha/murabaha-application"
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM ISSUE PERFORMA",res)
        }).catch(err => {
            console.log(err.message)
        })



     }
    //     axios.get(`http://localhost:10050/api/murabaha/goods-transfer?purchaseOrderId=${referenceId}`).then(response => {
    //         console.log(response)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    render() {
        const { isProformaModal, currentObj, isRecordedTrue, isGoodsModal, isMurabahaModal, term, peers,proformas,GoodsResponse } = this.state
        console.log("STATE IN BORROWER DASHBOARD",this.state)
        console.log("PURCHASE ORDER DATA", purchaseOrder)
        return (
            <React.Fragment>
                <Header user={'Borrower Dashboard'} ownedVault={'/borrowerDashboard'} recordedVault={'/borrowerDashboard/RecordedVault'} />
                <h2 className="mt-3" style={{ textAlign: 'center' }} >Owned Vault</h2>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                    {Boolean(proformas.length) &&  <TabPane tab="Proformas1" key="1">
                            <div>
                                <h2><b>Proformas</b></h2>
                                <div className="flexer">
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Reference No.</td>
                                                <td>Date</td>
                                                <td>Applicant</td>
                                                <td>Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Boolean(proformas.length) && proformas.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.proformaId} </td>
                                                    <td>{item.state.data.date}</td>
                                                    <td>{this.org(item.state.data.seller)}</td>
                                                    <td>{item.state.data.amount}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isProformaModal: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </TabPane>}
                        {Boolean(GoodsResponse.length) && <TabPane tab="Goods" key="2">
                            {Boolean(GoodsResponse.length) &&
                                <div className="flexer" style={{ flexDirection: 'column' }}>
                                    <h2><b>Goods</b></h2>
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Reference</td>
                                                <td>Asset</td>
                                                <td>Quantity</td>
                                                <td>Vendor</td>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {GoodsResponse && GoodsResponse.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.internalReference}</td>
                                                    <td>{item.state.data.asset} </td>
                                                    <td>{item.state.data.quantity}</td>

                                                    <td>{this.org(item.state.data.seller)}</td>

                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isGoodsModal: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            }
                        </TabPane>}
                        <TabPane tab="Murabaha Agreements" key="3">
                            <div>
                                <h2><b>Murabaha Agreements</b></h2>
                                <div className="flexer">
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Date</td>
                                                <td>Reference No.</td>
                                                <td>Borrower</td>
                                                <td>Term</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {murabahaAgreement && murabahaAgreement.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.ageementDate} </td>
                                                    <td>{item.state.data.internalReference}</td>
                                                    <td>{this.org(item.state.data.borrower)}</td>
                                                    <td>{item.state.data.term}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isMurabahaModal: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

                {/* <Button onClick={() => this.props.history.push('/sellerRecordedVault')} isOwnedVault={this.isOwnedVault} />
                <div className="flexer" style={{ flexDirection: 'column' }}>
                    <Link to="/performa" ><button className="main-btn" style={{ marginTop: '10px' }} >Issue Performa</button></Link>
                    <br />
                </div> */}

                {
                    isGoodsModal &&//Goods Modal
                    <Modal
                        size="xl"
                        show={isGoodsModal}
                        centered
                        onHide={() => this.setState({ isGoodsModal: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Goods
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <tr> <th> Reference</th><td>{currentObj.state.data.internalReference}</td></tr>
                                    <tr ><th>Asset</th><td>{currentObj.state.data.asset} </td></tr>
                                    <tr >   <th>Quantity</th> <td>{currentObj.state.data.quantity}</td></tr>
                                    <tr >  <th>Vendor</th><td>{this.org(currentObj.state.data.seller)}</td></tr>

                                    <tr >  <th>Takaful</th>{currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}</tr>
                                    <tr >  <td></td><td><button className='btn-murhaba' onClick={() => this.handleRedeem(currentObj.state.data.internalReference)} >Redeem</button></td></tr>












                                </table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }

                {
                    isProformaModal &&
                    <Modal
                        size="lg"
                        show={isProformaModal}
                        centered
                        onHide={() => this.setState({ isProformaModal: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Proforma
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <tr> <th> Reference</th><td>{currentObj.state.data.proformaId}</td></tr>
                                    <tr><th>Date</th><td>{currentObj.state.data.date} </td></tr>
                                    <tr><th>Assets</th><td>{currentObj.state.data.goods.asset} </td></tr>
                                    <tr><th>Vendor</th> <td>{this.org(currentObj.state.data.goods.seller)}</td></tr>
                                    <tr><th>Client</th><td>{this.org(currentObj.state.data.buyer)}</td></tr>
                                    <tr><th>Quantity</th><td>{currentObj.state.data.goods.quantity} </td></tr>

                                    <tr><th>Amount</th><td>{currentObj.state.data.amount} </td></tr>

                                    <tr><td><input name="term" className="goods-amount" placeholder="Term" value={term} onChange={this.handleChange} type="number" />
                                        <select name="peers" value={peers} onChange={this.handleChange} className="option">
                                            {DropDownOption && DropDownOption.peers.map((item, index) => (
                                                <option value={item} >{this.org(item)}</option>
                                            ))}
                                        </select>
                                    </td>
                                        <td>
                                            <button className='btn-murhaba'  onClick={() => this.handleApplication(currentObj.state.data.proformaId)} >Request Murabaha</button>
                                        </td>
                                        {/* <td>
                                        </td> */}
                                    </tr>
                                    {/* <thead  >
                                        <tr >
                                            <td>Assets</td>
                                            <td>Owner</td>
                                            <td>Client</td>
                                            <td>Reference</td>
                                            <td>Takaful</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentObj.state.data.asset} </td>
                                            <td>{currentObj.state.data.assetOwner}</td>
                                            <td>{currentObj.state.data.client}</td>
                                            <td>{currentObj.state.data.internalReference}</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}
                                            <td><button className='btn-murhaba' >Redeem</button></td>
                                        </tr>
                                    </tbody> */}
                                </table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }
                {
                    isMurabahaModal &&
                    <Modal
                        size="lg"
                        show={isMurabahaModal}
                        centered
                        onHide={() => this.setState({ isMurabahaModal: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Murabaha Agreement
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <tr> <th> Reference</th><td>{currentObj.state.data.internalReference}</td></tr>
                                    <tr> <th> Date</th><td>{currentObj.state.data.ageementDate}</td></tr>

                                    <tr><th>Bank</th> <td>{this.org(currentObj.state.data.bank)}</td></tr>
                                    <tr><th>Borrower</th><td>{this.org(currentObj.state.data.borrower)}</td></tr>

                                    <tr><th>Assets</th><td>{currentObj.state.data.goods.asset} </td></tr>
                                    <tr><th>CostPrice</th><td>{currentObj.state.data.costPrice} </td></tr>
                                    <tr><th>Selling Price</th><td>{currentObj.state.data.sellingprice} </td></tr>
                                    <tr><th>Term</th><td>{currentObj.state.data.term} </td></tr>
                                    <tr >  <td></td><td><button className='btn-murhaba' >Accept</button></td></tr>

                                    {/* <thead  >
                                        <tr >
                                            <td>Assets</td>
                                            <td>Owner</td>
                                            <td>Client</td>
                                            <td>Reference</td>
                                            <td>Takaful</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentObj.state.data.asset} </td>
                                            <td>{currentObj.state.data.assetOwner}</td>
                                            <td>{currentObj.state.data.client}</td>
                                            <td>{currentObj.state.data.internalReference}</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}
                                            <td><button className='btn-murhaba' >Accept</button></td>
                                        </tr>
                                    </tbody> */}
                                </table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }

            </React.Fragment>
        )
    }
}

export default BorrowerDashboard
