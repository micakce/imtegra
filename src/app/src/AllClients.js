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
            <div>
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
                                    <td>{client.abonado}</td>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.telefono}</td>
                                    <td>{client.address.street} {client.address.apto}</td>
                                    <td>{client.service}</td>
                                    <td onClick={() => this.deleteClient(client._id)} >X</td>
                                    <td ><ECModal action={'edit'} client={client} reload={this.fetchClients} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div >
                    <ECModal reload={this.fetchClients} action={'add'} />
                </div>
            </div>
        )
    }
}
