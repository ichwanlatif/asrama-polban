import React from "react";
import { Switch, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Map from "./components/Map";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./Components/Navigation/Navbar";
import Sidebar from "./Components/Navigation/Sidebar";
import FormPresensi from "./Components/Presensi/FormPresensi";

const Main = props =>(
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/dashboard" component={Dashboard} />
        {/* test ui */}
        <Route exact path="/navbar" component={Navbar} />
        <Route exact path="/sidebar" component={Sidebar} />
        <Route exact path="/formpresensi" component={FormPresensi} />
    </Switch>

)

export default Main;