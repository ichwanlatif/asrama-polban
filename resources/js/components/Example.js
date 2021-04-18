import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map.js';
// import Login from './Login/Login.js'

function Example() {
    return (
        <Map/>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
