import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import { Annyang } from './Annyang';
import { HTML5 } from './HTML5';
import '../stylesheets/main.scss';



class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul className="tabs">
            <li>
              <NavLink to="/html5">HTML5</NavLink>
            </li>
            <li>
              <NavLink to="/html5-spanish">HTML5 (Spanish)</NavLink>
            </li>
            <li>
              <NavLink to="/annyang">Annyang</NavLink>
            </li>
            <li>
              <NavLink to="/annyang-french">Annyang (French)</NavLink>
            </li>
          </ul>
          <div className="content"> 
            <Switch>
              <Route exact path="/html5">
                <HTML5 lang="en-US" key="en-US" />
              </Route>
              <Route exact path="/html5-spanish">
                <HTML5 lang="es-MX" key="es-MX"/>
              </Route>
              <Route path="/annyang">
                <Annyang lang="en-US" key="en-US"/>
              </Route>
              <Route path="/annyang-french">
                <Annyang lang="fr-FR" key="fr-FR"/>
              </Route>
              <Route path="/">
                <Redirect to="/html5" />
              </Route>
            </Switch>
          </div>  
        </div>
      </Router>
    );
  }
}

export default App;
