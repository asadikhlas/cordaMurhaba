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

class Routes extends Component {
    render() {
        return (
            <Router>
            <Header />
      <div>
        <Switch>
          <Route exact path="/" component={MurhabaTable} />   
          <Route exact path="/performa" component={IssuePerforma} />
            
        </Switch>
      </div>
    </Router>
        )
    }
}

export default Routes;