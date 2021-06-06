import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./Application";

//SBAdmin2 Style
import "./assets/adminbootstrap/css/sb-admin-2.min.css";

//Fontawesome Style
import "./assets/fontawesome/css/all.min.css";


//Redux
import { Provider } from 'react-redux';
import { Store } from './redux/store';

ReactDOM.render(
    <Provider store={Store}>
        <Application /> 
    </Provider> , document.getElementById('root')
);