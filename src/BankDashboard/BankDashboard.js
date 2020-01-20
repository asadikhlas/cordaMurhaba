import React, { Component } from 'react'
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
//import GoodsResponse from '../response.json';
import { Modal } from 'react-bootstrap';
//import applications from '../MurabahaApplicationState.json'
import murabahaAgreement from '../Murabaha.json'
import purchaseOrder from '../purchaseOrderPerforma.json'
import { Tabs } from 'antd';
import Header from '../Header/Header';
import DropDownOption from '../dropdown.json'
import axios from 'axios'
import queryString from 'query-string'

const { TabPane } = Tabs;


class BankDashboard extends Component {
    state = {
        isApplicationModal: false,
        currentObj: {},
        isRecordedTrue: false,
        isGoodsModal: false,
        isMurabahaModal:false,
        term:"",
        peers:"",
        GoodsResponse: [],
        applications: []
    }

    componentDidMount(){

        const APIURL = "http://localhost:10052/api/murabaha/my-applications"
        axios.get(`${APIURL}`).then(res => {
            this.setState({applications:res.data})
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

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    callback = (key) => {
        console.log(key);
    }

    handleOffer = (referenceId) => {// for offering theMuraba Agreement
        console.log("MURABAHA REFERENCE ID", referenceId)

        const parsed = queryString.parse(window.location.search);

              parsed.murabahaId=referenceId;
              
     
       const API="http://localhost:10052/api/murabaha/murabaha-offer"
       
       const stringified = queryString.stringify(parsed);
       const APIURL = "http://localhost:10052/api/murabaha/murabaha-offer"
       axios.get(`${APIURL}?${stringified}`).then(res => {
           console.log("RESPONSE FROM ISSUE PERFORMA",res)
       }).catch(err => {
           console.log(err.message)
       })
    }
    isRecordedTrue = () => this.setState({ isRecordedTrue: true })

    isOwnedVault = () => this.setState({ isRecordedTrue: false })

    org(party) {

        var i = party.indexOf('O');
        var i2 = party.indexOf(",");
        var o = party.slice(i + 2, i2);
        return o;
    }

     handlePurchaseOrder = (referenceId) => {
        const { term } = this.state

        console.log("Application ID", referenceId)
        
        const parsed = queryString.parse(window.location.search);

       
        parsed.murabahaId=referenceId;
        parsed.term=term;

        
        const stringified = queryString.stringify(parsed);
        const APIURL = "http://localhost:10052/api/murabaha/issue-purchaseorder"
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM ISSUE PERFORMA",res)
        }).catch(err => {
            console.log(err.message)
        })
    //     axios.get(`http://localhost:10050/api/murabaha/goods-transfer?purchaseOrderId=${referenceId}`).then(response => {
    //         console.log(response)
    //     }).catch(err => {
    //         console.log(err)
    //     })
 }

    render() {
        const { isApplicationModal, currentObj, isRecordedTrue, isGoodsModal, isMurabahaModal,term, applications,GoodsResponse} = this.state
        console.log("CURRENT OBJ", currentObj)
        return (
            <React.Fragment>
                <Header user={'Bank Dashboard'} ownedVault={'/bankDashboard'} recordedVault={'/bankDashboard/RecordedVault'} />
                <h2 className="mt-3" style={{ textAlign: 'center' }} >Owned Vault</h2>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                    {Boolean(applications.length) &&  <TabPane tab="applications" key="1">
                            <div>
                                <h2><b>Applications</b></h2>
                                <div className="flexer">
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                            <td>Date</td>
                                                <td>Reference No.</td>
                                                
                                                <td>Applicant</td>
                                                <td>Amount</td>
                                                <td>Tenor</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications && applications.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.date} </td>
                                                    <td>{item.state.data.referenceId}</td>
                                                    <td>{this.org(item.state.data.applicant)}</td>
                                                    <td>{item.state.data.amount}</td>
                                                    <td>{item.state.data.tenor}</td>

                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isApplicationModal: true })} >View</button></td>

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
                                        {Boolean(GoodsResponse.length) && GoodsResponse.map((item, i) => (
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
                                            <tr >  <td></td><td><button className='btn-murhaba' >Redeem</button></td></tr>
                                        
                                        
                             
                                            
                                            
                                            
                                            
                                            
                                            
                                          


                                </table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }

                {
                    isApplicationModal &&
                    <Modal
                        size="lg"
                        show={isApplicationModal}
                        centered
                        onHide={() => this.setState({ isApplicationModal: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Application
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <tr> <th> Reference</th><td>{currentObj.state.data.referenceId}</td></tr>
                                    <tr> <th> Date</th><td>{currentObj.state.data.date}</td></tr>
                                    <tr><th>Applicant</th><td>{this.org(currentObj.state.data.applicant)}</td></tr>
                                    <tr><th>Beneficiary</th><td>{this.org(currentObj.state.data.beneficiary)}</td></tr>

                                    <tr><th>Description</th><td>{currentObj.state.data.description}</td></tr>

                                    <tr><th>Amount</th><td>{currentObj.state.data.amount} </td></tr>
                                    <tr><th>Tenor</th><td>{currentObj.state.data.tenor} </td></tr>

                                    <tr><td><input name="term" className="goods-amount" placeholder="Term"  value={term} onChange={this.handleChange} type="number" /></td>                                        <td>
                                            <button className='btn-murhaba' onClick={() => this.handlePurchaseOrder(currentObj.state.data.referenceId)} >Issue Purchase Order</button>
                                        </td>
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
                                    <tr >  <td></td><td><button className='btn-murhaba'onClick={() => this.handleOffer(currentObj.state.data.internalReference)} >Offer</button></td></tr>
                                    
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

export default BankDashboard
