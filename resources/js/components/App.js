import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Route } from "react-router-dom";
import Main from "../Router";
import "../css/app.min.css";
import Sidebar from "./Navigation/Sidebar";
import Navbar from "./Navigation/Navbar";

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