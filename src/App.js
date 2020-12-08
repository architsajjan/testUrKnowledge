// IMPORTS
import React, { Fragment }  from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// IMPORT LOCAL COMPONENTS
import Navbar from './components/Navbar';
import Register from './components/Register';
import Instructions from './components/Instructions';
import Test from './components/Test';
import Submit from './components/Submit';

// IMPORT MAIN STYLE SHEET
import './App.css';

export default function App() {
  return(
          <Router>
            <Fragment>
              <Navbar />
                <Switch>
                <Route exact path="/" component={ Register } />
                  <Route exact path="/test-instructions" component={ Instructions } />
                  <Route path="/test/:testLevel" component={ Test } />
                  <Route  path="/submit-test" component={ Submit } />
                  <Redirect from="*" to="/" />
                </Switch>
            </Fragment>
          </Router>
  );
}