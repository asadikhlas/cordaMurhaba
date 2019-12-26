import React, { Component } from 'react'
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
import Response from '../response.json';
import { Modal } from 'react-bootstrap';
import murabahaApplication from '../MurabahaApplicationState.json'
import PerformaResponse from '../performaResponse.json';

import murabahaAgreement from '../Murabaha.json'
import purchaseOrder from '../purchaseOrderPerforma.json'
import { Tabs } from 'antd';
import Header from '../Header/Header';
import DropDownOption from '../dropdown.json'

const { TabPane } = Tabs;

class BorrowerDashboard extends Component {
    state = {
        isModalOpen: false,
        currentObj: {},
        isRecordedTrue: false,
        isPurchaseModalOpen: false
    }

    callback = (key) => {
        console.log(key);
    }


    isRecordedTrue = () => this.setState({ isRecordedTrue: true })

    isOwnedVault = () => this.setState({ isRecordedTrue: false })


    /**
     * @param  {Array} party
     */
    org(party) {

        var i = party.indexOf('O');
        var i2 = party.indexOf(",");
        var o = party.slice(i + 2, i2);
        return o;
    }

    // handleAccept = (referenceId) => {
    //     console.log("REFERENCE ID", referenceId)
    //     axios.get(`http://localhost:10050/api/murabaha/goods-transfer?purchaseOrderId=${referenceId}`).then(response => {
    //         console.log(response)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    render() {
        const { isModalOpen, currentObj, isRecordedTrue, isPurchaseModalOpen } = this.state
        console.log("CURRENT OBJECT", currentObj)
        return (
            <React.Fragment>
                <Header />
                <h2 className="mt-3" style={{ textAlign: 'center' }} Bank>Recorded Vault</h2>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Proformas" key="1">
                            <div>
                                <h2><b>Proformas</b></h2>
                                <div className="flexer">
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Date</td>
                                                <td>Reference No.</td>
                                                <td>Client</td>
                                                <td>Amount</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Response && PerformaResponse.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.date} </td>
                                                    <td>{item.state.data.proformaId}</td>
                                                    <td>{this.org(item.state.data.buyer)}</td>
                                                    <td>{item.state.data.amount}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isModalOpen: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </TabPane>
                        {purchaseOrder && <TabPane tab="Goods" key="2">
                            {purchaseOrder &&
                                <div className="flexer" style={{ flexDirection: 'column' }}>
                                    <h2><b>Goods</b></h2>
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Reference</td>
                                                <td>Client</td>
                                                <td>Asset</td>
                                                <td>Vendor</td>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Response && Response.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.internalReference}</td>
                                                    <td>{this.org(item.state.data.client)}</td>
                                                    <td>{item.state.data.asset} </td>
                                                    <td>{this.org(item.state.data.seller)}</td>

                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isPurchaseModalOpen: true })} >View</button></td>

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
                                            {Response && murabahaAgreement.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.ageementDate} </td>
                                                    <td>{item.state.data.internalReference}</td>
                                                    <td>{this.org(item.state.data.borrower)}</td>
                                                    <td>{item.state.data.term}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isModalOpen: true })} >View</button></td>

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
                                    <thead  >
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
                                    </tbody>
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
                                <table className="rwd-table w-75">
                                    <tr> <td> Reference</td><td>{currentObj.state.data.goods.internalReference}</td></tr>
                                    <tr><td>Assets</td><td>{currentObj.state.data.goods.asset} </td></tr>
                                    <tr><td>Owner</td> <td>{currentObj.state.data.goods.assetOwner}</td></tr>
                                    <tr><td>Client</td><td>{currentObj.state.data.buyer}</td></tr>
                                    <tr><td>Takaful</td>{currentObj.state.data.goods.takaful ? <td>Yes</td> : <td>No</td>}</tr>
                                    <tr>
                                        <td>
                                            <button className='btn-murhaba'>Redeem</button>
                                        </td>
                                    </tr>
                                    {/* <tr></tr> */}
                                    {/* <tr><td></td></tr> */}

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

            </React.Fragment>
        )
    }
}

export default BorrowerDashboard
