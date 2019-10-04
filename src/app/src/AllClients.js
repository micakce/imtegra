import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import ECModal from './ECModal';
import { Link } from 'react-router-dom';

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
        fetch(window.location.pathname)
            .then(res => res.json())
            .then(data => {
                this.setState({ clients: data });
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

                            // let service_list = []
                            // if (client.services.length > 0) {
                            //     service_list = client.services.map(service => {
                            //         return (<div key={service._id}>{service.service} - {service.plan}</div>);
                            //     })
                            // }
                            if (client.services.length > 0) {

                                return(
                                    client.services.map( service => {
                                        if (client.status === 'Implementacion') {
                                            return (
                                                < tr key={service._id}  >
                                                    <td>
                                                        <Link to={`/clients/client/${client.abonado}`}>
                                                            {client.abonado}
                                                        </Link>
                                                    </td>
                                                    <td>{client.name}</td>
                                                    {/* <td>{service_list}</td> */}
                                                    <td>{service.service} - {service.plan}</td>
                                                    <td>{service.pm}</td>
                                                    <td>{service.im}</td>
                                                    <td>{service.status}</td>
                                                    <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td>
                                                    <td ><ECModal action={'edit'} client={client} reload={this.fetchClients} /></td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                < tr key={client._id}  >
                                                    <td>
                                                        <Link to={`/clients/client/${client.abonado}`}>
                                                            {client.abonado}
                                                        </Link>
                                                    </td>
                                                    <td>{client.name}</td>
                                                    <td  colSpan="4" > No posee servicios en implementacion</td>
                                                    <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td>
                                                    <td ><ECModal action={'edit'} client={client} reload={this.fetchClients} /></td>
                                                </tr>
                                            )
                                        }
                                    })
                                )
                            } else {
                                return (
                                    < tr key={client._id}  >
                                        <td>
                                            <Link to={`/clients/client/${client.abonado}`}>
                                                {client.abonado}
                                            </Link>
                                        </td>
                                        <td>{client.name}</td>
                                        <td  colSpan="4" > No posee servicios en implementacion</td>
                                        <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td>
                                        <td ><ECModal action={'edit'} client={client} reload={this.fetchClients} /></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
                <ECModal reload={this.fetchClients} action={'add'} />
            </div>
        )
    }
}
