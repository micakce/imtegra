import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import ECModal from './ECModal'

export default class AllClients extends Component {

    constructor() {
        super();
        this.state = {
            clients: []
        };
        this.fetchClients = this.fetchClients.bind(this);
    }

    componentDidMount() {
        this.fetchClients();
    }


    async deleteClient(id) {
        if (window.confirm('Seguro quieres eliminar este cliente?')) {
            // const respuesta = await fetch(`/clients/${id}`, {
            fetch(`/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(JSON.stringify(res)))
                .catch(err => console.error(err))
            this.fetchClients();
        }
    }

    fetchClients() {
        fetch('/clients')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ clients: data });
                console.log(this.state)
            })
            .catch(err => console.error(err));
    }

    render() {

        return (
            <Table size="sm" variant="dark" striped bordered hover>
                <thead>
                    <tr>
                        <th>Abonado</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Servicios</th>
                        <th>Del</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.clients.map(client => {
                        return (
                            <tr key={client._id}>
                                <th>{client.abonado}</th>
                                <th>{client.name}</th>
                                <th>{client.email}</th>
                                <th>{client.telefono}</th>
                                <th>{client.address.street} {client.address.apto}</th>
                                <th>{client.service}</th>
                                <th onClick={() => this.deleteClient(client._id)} >X</th>
                                <th ><ECModal client={client} reload={this.fetchClients} /></th>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
