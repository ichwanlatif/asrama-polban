import React from "react";
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Map from "./components/Map";

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/map" component={Map} />
    </Switch>

)

export default Main;