import React, { Component } from 'react';
import AppRouter from './Routering.js'
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="container">
                <AppRouter />
            </div>
        );
    }
}

export default App;
