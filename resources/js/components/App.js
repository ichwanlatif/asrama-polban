import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Route } from "react-router-dom";
import Main from "../Router";

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
          {/* <Header /> */}
          <Route default component={Main}/>
        </HashRouter>
      </div>
    );
  }
}
export default App;
ReactDOM.render(<App />, document.getElementById('root'));