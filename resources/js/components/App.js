import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Route } from "react-router-dom";
import Main from "../Router";
// import "../css/app.min.css";
import Sidebar from "./Navigation/Sidebar";
import Navbar from "./Navigation/Navbar";
import "../vendor/adminbootstrap/css/sb-admin-2.min.css";
import "../vendor/adminbootstrap/js/sb-admin-2.min.js";
import "../vendor/fontawesome/css/all.min.css";

class App extends Component {
  constructor(){
    super();
    this.state={

    };
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <HashRouter>
          <Route component={Main}/>
        </HashRouter>
      </div>
    );
  }
}
export default App;
ReactDOM.render(<App />, document.getElementById('root'));