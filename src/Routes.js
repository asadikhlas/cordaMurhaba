import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SellerDashboard from './SellerDashboard/SellerDashboard'
import IssuePerforma from './IssuePerforma/IssuePerforma'
import TermSheet from './termSheet/termSheet'
import SellerRecordedVault from './SellerRecordedVault/SellerRecordedVault';
import BorrowerDashboard from './BorrowerDashboard/BorrowerDashboard';
import BankDashboard from './BankDashboard/BankDashboard';
import BankRecordedVault from './BankRecordedVault/BankRecordedVault';
import BorrowerRecordedVault from './borrowerRecordedVault/BorrowerRecordedVault';


class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={SellerDashboard} />
            <Route exact path="/sellerRecordedVault" component={SellerRecordedVault} />
            <Route exact path="/performa" component={IssuePerforma} />
            <Route exact path="/termSheet" component={TermSheet} />

            <Route exact path="/borrowerDashboard" component={BorrowerDashboard} />
            <Route exact path="/borrowerDashboard/RecordedVault" component={BorrowerRecordedVault} />
            <Route exact path="/bankDashboard" component={BankDashboard} />
            <Route exact path="/bankDashboard/RecordedVault" component={BankRecordedVault} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;