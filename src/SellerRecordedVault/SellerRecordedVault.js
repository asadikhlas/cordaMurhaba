import React, { Component } from 'react'
import PerformaResponse from '../performaResponse.json';
import { Tabs } from 'antd';
import Header from '../Header/Header';

const { TabPane } = Tabs;


class SellerRecordedVault extends Component {
    callback = (key) => {
        console.log(key);
    }
    render() {
        return (
            <div>
            <Header />
                <h2 className="mt-3" style={{ textAlign: 'center' }} >Recorded Vault</h2>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Recorded Vault 1" key="1">
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
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
             </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                        </TabPane>
                </Tabs>

            </div>
        )
    }
}

export default SellerRecordedVault;
