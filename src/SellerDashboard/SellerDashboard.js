import React, { Component } from 'react'
import './SellerDashboard.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
import GoodsResponse from '../response.json';
import { Modal } from 'react-bootstrap';
//import purchaseOrders from '../purchaseOrderPerforma.json'
import { Tabs } from 'antd';
import Header from '../Header/Header';
import axios from 'axios'
import queryString from 'query-string'
const { TabPane } = Tabs;

class SellerDashboard extends Component {
    state = {
        isModalOpen: false,
        currentObj: {},
        isRecordedTrue: false,
        isPurchaseModalOpen: false,
    //    GoodsResponse: [],
        purchaseOrders:[]
    }

    componentDidMount(){

        const APIGOODS = "http://localhost:10050/api/murabaha/my-goods"
        axios.get(`${APIGOODS}`).then(res => {
       //     this.setState({GoodsResponse:res.data})
            console.log("RESPONSE FROM MY GOODS API",res)
        }).catch(err => {
            console.log(err.message)
        })
        //purchase orders get api
        const APIPURCHASEORDERS = "http://localhost:10050/api/murabaha/purchaseorder"
        axios.get(`${APIPURCHASEORDERS}`).then(res => {
            this.setState({purchaseOrders:res.data})
            console.log("RESPONSE FROM MY GOODS API",res)
        }).catch(err => {
            console.log(err.message)
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
    handleBurn = (referenceId) => {// for GOODS TO REDEEM
       console.log("IN BURN FUNCTION")
        console.log("GOODSID", referenceId)

        const parsed = queryString.parse(window.location.search);

        parsed.goodsId = referenceId;


        const stringified = queryString.stringify(parsed);
        const APIURL = "http://localhost:10050/api/murabaha/burn"
        console.log(`${APIURL}?${stringified}`);
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM BURN", res)
            alert(res.data);
        }).catch(err => {
            console.log(err.message)
        })
    }
    handleAccept = (referenceId) => {// for accepting the Purchase Order and transfer goods
         console.log("PURCHASE ORDER REFERENCE ID", referenceId)

         const parsed = queryString.parse(window.location.search);

               parsed.purchaseOrderId=referenceId;
      
        
        const stringified = queryString.stringify(parsed);
        const APIURL = "http://localhost:10050/api/murabaha/goods-transfer"
        axios.get(`${APIURL}?${stringified}`).then(res => {
            console.log("RESPONSE FROM ACCEPT PO",res)
            alert(res.data);
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
        const { isModalOpen, currentObj, isRecordedTrue, isPurchaseModalOpen, purchaseOrders } = this.state
        return (
            <React.Fragment>
                <Header user={'Seller Dashboard'} ownedVault={'/'} recordedVault={'/sellerRecordedVault'} isIssuePerforma />
                <h2 className="mt-3" style={{ textAlign: 'center' }} >Owned Vault</h2>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                      {Boolean(GoodsResponse.length) && 
                        <TabPane tab="Goods" key="1">
                        <div>
                            <h2><b>Goods</b></h2>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <thead  >
                                        <tr >
                                            <td>Asset</td>
                                            <td>Owner</td>
                                            <td>Vendor</td>
                                            <td>Reference</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Boolean(GoodsResponse.length) && GoodsResponse.map((item, i) => (
                                            <tr>
                                                <td>{item.state.data.asset} </td>
                                                <td>{this.org(item.state.data.assetOwner)}</td>
                                                <td>{this.org(item.state.data.seller)}</td>
                                                <td>{item.state.data.internalReference}</td>
                                                <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isModalOpen: true })} >View</button></td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>



                            </div>
                        </div>
                    </TabPane>
                      
                      }
                        {Boolean(purchaseOrders.length) && <TabPane tab="Purchase Orders" key="2">
                            {Boolean(purchaseOrders.length) &&
                                <div className="flexer" style={{ flexDirection: 'column' }}>
                                    <h2><b>Purchase Orders</b></h2>
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Date</td>
                                                <td>ReferenceID</td>
                                                <td>Bank</td>
                                                <td>Client</td>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Boolean(purchaseOrders.length) && purchaseOrders.map((item, i) => (

                                                <tr>
                                                    <td>{item.state.data.date} </td>
                                                    <td>{item.state.data.referenceId}</td>
                                                    <td>{this.org(item.state.data.bank)}</td>
                                                    <td>{this.org(item.state.data.client)}</td>
                                                   
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isPurchaseModalOpen: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            }
                        </TabPane>}
                    </Tabs>
                </div>

                {/* <Button onClick={() => this.props.history.push('/sellerRecordedVault')} isOwnedVault={this.isOwnedVault} />
                <div className="flexer" style={{ flexDirection: 'column' }}>
                    <Link to="/performa" ><button className="main-btn" style={{ marginTop: '10px' }} >Issue Performa</button></Link>
                    <br />
                </div> */}

                {
                    isPurchaseModalOpen &&
                    <Modal
                        size="xl"
                        show={isPurchaseModalOpen}
                        centered
                        onHide={() => this.setState({ isPurchaseModalOpen: false })}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                Purchase Order
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">

                                <tr> <th> Date</th><td>{currentObj.state.data.date}</td></tr>
                                <tr ><th>Reference</th><td>{currentObj.state.data.referenceId} </td></tr>
                                            <tr >   <th>Asset</th> <td>{currentObj.state.data.description}</td></tr>
                                            <tr >  <th>Bank</th><td>{this.org(currentObj.state.data.bank)}</td></tr>
                                            <tr >  <th>Client</th><td>{this.org(currentObj.state.data.client)}</td></tr>
                                            <tr >  <th>Proforma</th><td>{currentObj.state.data.proforma.proformaId}</td></tr>

                                            <tr >  <td></td><td><button className='btn-murhaba' onClick={() => this.handleAccept(currentObj.state.data.referenceId)}  >Accept PO</button></td></tr>
                                        

                                    {/* <thead  >
                                        <tr >
                                            <td>Date</td>
                                            <td>Bank</td>
                                            <td>Client</td>
                                            <td>ReferenceID</td>
                                            <td>Description</td>
                                            <td>PerformaID</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentObj.state.data.date} </td>
                                            <td>{currentObj.state.data.bank}</td>
                                            <td>{currentObj.state.data.client}</td>
                                            <td>{currentObj.state.data.referenceId}</td>
                                            <td>{currentObj.state.data.description}</td>
                                            <td>{currentObj.state.data.proformaId}</td>
                                            <td><button className='btn-murhaba' onClick={() => this.handleAccept(currentObj.state.data.referenceId)} >Accept PO</button></td>


                                        </tr>
                                    </tbody> */}
                                </table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }

                {
                    isModalOpen &&
                    <Modal
                        size="lg"
                        show={isModalOpen}
                        centered
                        onHide={() => this.setState({ isModalOpen: false })}
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
                                <tr ><th>Assets</th><td>{currentObj.state.data.asset} </td></tr>
                                            <tr >   <th>Quantity</th> <td>{currentObj.state.data.quantity}</td></tr>
                                            <tr >  <th>Vendor</th><td>{this.org(currentObj.state.data.seller)}</td></tr>
                                           
                                            <tr >  <th>Takaful</th>{currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}</tr>
                                            <tr >  <td></td><td><button className='btn-murhaba'onClick={() => this.handleBurn(currentObj.state.data.internalReference)} >Burn</button></td></tr>
                                        
                                    {/* <thead  >
                                        <tr >
                                            <td>Assets</td>
                                            <td>Quantity</td>
                                            <td>Client</td>
                                            <td>Reference</td>
                                            <td>Takaful</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentObj.state.data.asset} </td>
                                            <td>{currentObj.state.data.quantity}</td>
                                            <td>{currentObj.state.data.seller}</td>
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

            </React.Fragment>
        )
    }
}

export default SellerDashboard
