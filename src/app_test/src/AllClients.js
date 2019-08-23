import React, { Component } from 'react';

export default class AllClients extends Component {

    componentDidMount() {
        this.fetchClients();
    }

    fetchClients(){
        fetch('http://18.231.73.72:3000/clients')
            .then(res => res.json())
            .then(data => console.log(data));
    }

    render() {

        return(
            <div>
                <h1>Aqui van los clienets</h1>
            </div>
        )
    }
}
