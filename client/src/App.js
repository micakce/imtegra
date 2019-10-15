import React, { Component } from 'react';
import AppRouter from './AppRouter'
import 'bootstrap/dist/css/bootstrap.min.css';

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