import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MurhabaTable from './MurhabaTable/MurhabaTable'
import IssuePerforma from './IssuePerforma/IssuePerforma'
import SellerRecordedVault from './SellerRecordedVault/SellerRecordedVault';
import BorrowerDashboard from './BorrowerDashboard/BorrowerDashboard';

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MurhabaTable} />
            <Route exact path="/performa" component={IssuePerforma} />
            <Route exact path="/sellerRecordedVault" component={SellerRecordedVault} />
            <Route exact path="/borrowerDashboard" component={BorrowerDashboard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;