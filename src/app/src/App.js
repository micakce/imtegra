import React, { Component } from 'react';
import Navigation from './Nav.js';
import AppRouter from './Routering.js'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                {/* <Navigation /> */}
                <AppRouter />
                <h1>Hola como estas</h1>
            </div>
        );
    }
}

export default App;
