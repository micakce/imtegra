import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Button, Badge, InputGroup } from 'react-bootstrap';

import MyModal from './MyModal';
import AddClient from './AddClient';
import { AuthConsumer } from "./authContext";
import Can from "./Can";

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

  deleteService(client_id, service_id ) {
    if (window.confirm('Seguro quieres eliminar este servicio?')) {
      fetch(`/clients/${client_id}`, {
        method: 'DELETE',
        body: JSON.stringify({ client_id, service_id, what: "service" }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
      this.fetchClients();
    }
  }

  deleteClient(client_id) {
    if (window.confirm('Seguro quieres eliminar este cliente?')) {
      fetch(`/clients/${client_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => console.log(res.message))
        .then(data => console.log(data))
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

    const AddClientModal = ({ client }) => (
      <MyModal
        title="Editar Cliente"
        buttonLabel="Editar"
        render={toggle => (
          <AddClient
            toggle={toggle}
            action="edit"
            client={client}
            reload={this.fetchClients}
          />
        )} />
    )

    const CanEditClient = ({ client, user }) => (
      <Can
        role={user.role}
        perform="clients:edit"
        yes={() => (
          <AddClientModal client={client} />
        )}
      />
    )

    const CanDeleteService = ({ client, service,  user }) => (
      <Can
        role={user.role}
        perform="services:delete"
        yes={() => (
          <Button variant="danger" onClick={() => this.deleteService(client._id, service._id)} >X </Button>
        )}
      />
    )

    const CanDeleteClient = ({ client, user }) => (
      <Can
        role={user.role}
        perform="clients:delete"
        yes={() => (
          <Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button>
        )}
      />
    )

    const cellStyle = { display: "table-cell", verticalAlign: "middle" };

    return (
      <AuthConsumer>
        {({ user }) => (
          <Can
            role={user.role}
            perform="services:list"
            yes={() =>
              <React.Fragment>
                <Table className="mt-3" size="sm"  striped hover>
                  <thead>
                    <tr  >
                      <th onClick={() => console.log(this.state)}>Abonado</th>
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

                      if (client.services.length > 0) {

                        return (
                          client.services.map(service => {
                            if (client.status === 'Implementacion') {
                              return (
                                <tr key={service._id} hidden={false} >
                                  <td style={cellStyle}>
                                    <Link to={`/clients/client/${client.abonado}`}>
                                      {client.abonado}
                                    </Link>
                                  </td>
                                  <td style={cellStyle}>{client.name}</td>
                                  <td style={cellStyle}><Badge>{service.service} - {service.plan}</Badge></td>
                                  <td style={cellStyle}>{service.pm}</td>
                                  <td style={cellStyle}>{service.im}</td>
                                  <td style={cellStyle}>{service.status}</td>
                                  {/* <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id, service._id, 'service')} >X </Button> </td>
                                  <td ><AddClientModal client={client} /></td> */}
                                  <td style={cellStyle}> <CanDeleteService client={client} service={service} user={user} /></td>
                                  <td style={cellStyle}> <CanEditClient client={client} user={user} /></td>
                                </tr>
                              )
                            } else {
                              return (
                                < tr key={client._id}  >
                                  <td style={cellStyle}>
                                    <Link to={`/clients/client/${client.abonado}`}>
                                      {client.abonado}
                                    </Link>
                                  </td>
                                  <td style={cellStyle}>{client.name}</td>
                                  <td style={cellStyle} colSpan="4" > No posee servicios en implementacion</td>
                                  {/* <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td>
                                  <td ><AddClientModal client={client} /></td> */}
                                  <td style={cellStyle}> <CanDeleteClient client={client} user={user} /></td>
                                  <td style={cellStyle}> <CanEditClient client={client} user={user} /></td>
                                </tr>
                              )
                            }
                          })
                        )
                      } else {
                        return (
                          < tr key={client._id}  >
                            <td style={cellStyle}>
                              <Link to={`/clients/client/${client.abonado}`}>
                                {client.abonado}
                              </Link>
                            </td>
                            <td style={cellStyle}>{client.name}</td>
                                  <td style={cellStyle} colSpan="4" > No posee servicios en implementacion</td>
                            {/* <td  ><Button variant="danger" onClick={() => this.deleteClient(client._id)} >X </Button> </td> */}
                            {/* <td > <AddClientModal client={client} /> </td> */}
                            <td style={cellStyle}> <CanDeleteClient client={client} user={user} /></td>
                            <td style={cellStyle}> <CanEditClient client={client} user={user} /></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
                <Can
                  role={user.role}
                  perform="clients:add"
                  yes={() =>(
                    <MyModal
                      title="Agregar Cliente"
                      buttonLabel="Agregar"
                      render={toggle => (
                        <AddClient
                          action="add"
                          toggle={toggle}
                          reload={this.fetchClients}
                        />
                      )}
                    />
                  )}
                />
              </React.Fragment>
            }
            no={() => <Redirect to="/" />}
          />
        )}
      </AuthConsumer>
    )
  }
}
