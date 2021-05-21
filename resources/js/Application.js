import React, { Component } from 'react';
import {HashRouter, Route } from "react-router-dom";

import Main from "./Router";

class Application extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            user: {}
        };
    }
      
    componentWillMount(){
        let state = localStorage["appState"];
        if(state){
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user});
        }
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
export default Application;