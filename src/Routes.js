import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MurhabaTable from './MurhabaTable/MurhabaTable'
import IssuePerforma from './IssuePerforma/IssuePerforma'
import Header from './Header/Header';
import SellerRecordedVault from './SellerRecordedVault/SellerRecordedVault';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={MurhabaTable} />
            <Route exact path="/performa" component={IssuePerforma} />
            <Route exact path="/sellerRecordedVault" component={SellerRecordedVault} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes;