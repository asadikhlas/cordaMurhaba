import React, { Component } from 'react'
import './MurhabaTable.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
import Response from '../response.json';
import { Modal } from 'react-bootstrap';
import PerformaResponse from '../performaResponse.json';
import purchaseOrderPerforma from '../purchaseOrderPerforma.json'

class MurhabaTable extends Component {
    state = {
        isModalOpen: false,
        currentObj: {},
        isRecordedTrue: false,
        isPurchaseModalOpen: false
    }

    isRecordedTrue = () => this.setState({ isRecordedTrue: true })

    isOwnedVault = () => this.setState({ isRecordedTrue: false })

    render() {
        const { isModalOpen, currentObj, isRecordedTrue, isPurchaseModalOpen } = this.state
        return (
            <React.Fragment>
                <Button isRecordedTrue={this.isRecordedTrue} isOwnedVault={this.isOwnedVault} />
                <div className="flexer" style={{ flexDirection: 'column' }}>
                    <Link to="/performa" ><button className="main-btn" style={{ marginTop: '10px' }} >Issue Performa</button></Link>
                    <br />
                    {isRecordedTrue ?
                        <div>
                            <h2 style={{ textAlign: 'center' }} >Recorded Vault</h2>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <thead  >
                                        <tr >
                                            <td>Buyer</td>
                                            <td>Date</td>
                                            <td>Performa ID</td>
                                            <td>Description</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PerformaResponse && PerformaResponse.map((item, i) => (
                                            <tr>
                                                <td>{item.state.data.buyer} </td>
                                                <td>{item.state.data.date}</td>
                                                <td>{item.state.data.proformaId}</td>
                                                <td>{item.state.data.description}</td>

                                            </tr>
                                        ))}

                                    </tbody></table>
                            </div>
                        </div>
                        :
                        <div>
                            <h2 style={{ textAlign: 'center' }} >Owned Vault</h2>
                            <hr />
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
                                                <td>{item.state.data.assetOwner}</td>
                                                <td>{item.state.data.client}</td>
                                                <td>{item.state.data.internalReference}</td>
                                                <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isModalOpen: true })} >View</button></td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>



                            </div>

                            {purchaseOrderPerforma &&
                                <div>
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
                                                    <td>{item.state.data.bank}</td>
                                                    <td>{item.state.data.client}</td>
                                                    <td>{item.state.data.referenceId}</td>
                                                    <td><button className='btn-murhaba' onClick={() => this.setState({ currentObj: item, isPurchaseModalOpen: true })} >View</button></td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    }


                </div>
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
                                            <td><button className='btn-murhaba' >Accept PO</button></td>


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
