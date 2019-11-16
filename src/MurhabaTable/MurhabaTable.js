import React, { Component } from 'react'
import './MurhabaTable.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'
import Response from '../response.json';
import { Modal } from 'react-bootstrap';
import PerformaResponse from '../performaResponse.json';

class MurhabaTable extends Component {
    state = {
        isModalOpen: false,
        currentObj: {},
        isRecordedTrue: false
    }

    isRecordedTrue = () => this.setState({ isRecordedTrue: true })

    isOwnedVault = () => this.setState({ isRecordedTrue: false })

    render() {
        const { isModalOpen, currentObj, isRecordedTrue } = this.state
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

                                    </tbody></table>
                            </div>
                        </div>
                    }


                </div>
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
                                Owned vault
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flexer">
                                <table className="rwd-table">
                                    <thead  >
                                        <tr >
                                            <td>Asset</td>
                                            <td>Owner</td>
                                            <td>Client</td>
                                            <td>Reference</td>
                                            <td>Takaful</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentObj.state.data.asset} </td>
                                            <td>{currentObj.state.data.assetOwner}</td>
                                            <td>{currentObj.state.data.client}</td>
                                            <td>{currentObj.state.data.internalReference}</td>
                                            {currentObj.state.data.takaful ? <td>Yes</td> : <td>No</td>}


                                        </tr>
                                    </tbody></table>
                            </div>

                        </Modal.Body>
                    </Modal>

                }
            </React.Fragment >
        )
    }
}

export default MurhabaTable
