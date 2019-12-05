import React, { Component } from 'react'
import './MurhabaTable.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
import Response from '../response.json';
import { Modal } from 'react-bootstrap';
import purchaseOrderPerforma from '../purchaseOrderPerforma.json'
import { Tabs } from 'antd';
import Header from '../Header/Header';
const { TabPane } = Tabs;

class MurhabaTable extends Component {
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

    org(party) {
        //O=Seller, L=Lahorek, C=PK
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
        return (
            <React.Fragment>
                <Header />
                <h2 className="mt-3" style={{ textAlign: 'center' }} >Owned Vault</h2>
                <div>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Good State" key="1">
                            <div>
                                <h2><b>Good State</b></h2>
                                <div className="flexer">
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Asset</td>
                                                <td>Owner</td>
                                                <td>Client</td>
                                                <td>Reference</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Response && Response.map((item, i) => (
                                                <tr>
                                                    <td>{item.state.data.asset} </td>
                                                    <td>{this.org(item.state.data.assetOwner)}</td>
                                                    <td>{this.org(item.state.data.client)}</td>
                                                    <td>{item.state.data.internalReference}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isModalOpen: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>



                                </div>
                            </div>
                        </TabPane>
                        {purchaseOrderPerforma && <TabPane tab="Purchase Order State" key="2">
                            {purchaseOrderPerforma &&
                                <div className="flexer" style={{ flexDirection: 'column' }}>
                                    <h2><b>Purchase Order State</b></h2>
                                    <table className="rwd-table">
                                        <thead  >
                                            <tr >
                                                <td>Date</td>
                                                <td>Bank</td>
                                                <td>Client</td>
                                                <td>ReferenceID</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseOrderPerforma && purchaseOrderPerforma.map((item, i) => (

                                                <tr>
                                                    <td>{item.state.data.date} </td>
                                                    <td>{this.org(item.state.data.bank)}</td>
                                                    <td>{this.org(item.state.data.client)}</td>
                                                    <td>{item.state.data.referenceId}</td>
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
                        size="xl"
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
                                    <thead  >
                                        <tr >
                                            <td>Assets</td>
                                            <td>Owner</td>
                                            <td>Client</td>
                                            <td>Reference</td>
                                            <td>Takaful</td>
                                            <td></td>
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
                                    </tbody></table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }

            </React.Fragment>
        )
    }
}

export default MurhabaTable
