import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import ECModal from './ECModal';
import { Link } from 'react-router-dom';
// import ViewClient from './ViewClient';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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


    deleteClient(id) {
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
                // console.log(data);
                this.setState({ clients: data });
                // console.log(this.state)
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
                            {/* <th>Email</th> */}
                            {/* <th>Telefono</th>
                            <th>Direccion</th> */}
                            <th>Servicios</th>
                            <th>PM</th>
                            <th>Implementador</th>
                            <th>Estatus</th>
                            <th>Del</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.clients.map(client => {

                            let service_list = []
                            if (client.services.length > 0) {
                                service_list = client.services.map(service => {
                                    return (<div key={service._id}>{service.service} - {service.plan}</div>);
                                })
                            }
                            return (

                                <tr key={client._id}  >
                                    {/* <td> <Link to={`/clients/client/${client.abonado}`} >{client.abonado}</Link></td> */}
                                    <td>
                                        <Link to={`/clients/client/${client.abonado}`}>
                                            {client.abonado}
                                        </Link>
                                    </td>
                                    <td>{client.name}</td>
                                    {/* <td>{client.email}</td> */}
                                    {/* <td>{client.telefono}</td>
                                    <td>{client.address.street} {client.address.apto}</td> */}
                                    <td>{service_list}</td>
                                    <td>{client.pm}</td>
                                    <td>{client.im}</td>
                                    <td>{client.status}</td>
                                    <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td>
                                    <td ><ECModal action={'edit'} client={client} reload={this.fetchClients} /></td>
                                    {/* <Route path={`/clients/client/${client.abonado}`} render={() => <ViewClient cliente={client} />} /> */}
                                </tr>

                            )
                        })}
                    </tbody>
                </Table>
                <ECModal reload={this.fetchClients} action={'add'} />
            </div>
        )
    }
}
