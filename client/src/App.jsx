import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/Home';
import Poll from './components/Poll';


export default class App extends Component {
  render() {
    return (
      <Router>
       <div className="app">
         <Route exact path="/" component={Home} />
         <Route exact path="/poll/:id" component={Poll} />
       </div>
     </Router>
    );
  }
}
