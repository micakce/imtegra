import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Button, Badge } from 'react-bootstrap';

import MyModal from './MyModal';
import AddClient from './AddClient';
import { AuthConsumer } from "./authContext";
import Can from "./Can";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

    const cellStyle = { display: "table-cell", verticalAlign: "middle" };

    const data = [];
    this.state.clients.map( client => {
      if (client.services.length > 0) {
        client.services.map( service => {
          if (service.status !== "Baja"||"Completado") {
            data.push({
              abonado: client.abonado,
              name: client.name,
              clientId: client._id,
              service
            })
          }
        })
      } else {
        data.push({
          abonado: client.abonado,
          name: client.name,
          clientId: client._id,
          service: {service: "Nada en implementacion"}
        })
      }
    } )

    const columns = [{
      Header: "Abonado",
      accessor: "abonado",
      Cell: props => <Link to={ `/clients/client/${props.value}` }>{props.value}</Link>,
    },{
      Header: "Nombre",
      accessor: "name",
      filterMethod: (filter, row) =>
      row[filter.id].match(filter.value)
    },{
      id: "Servicio",
      Header: "Servicio",
      accessor: d => d.service.service,
      Cell: props => <Badge>{props.value}</Badge>
    },{
      id: "pm",
      Header: "PM",
      accessor: d => d.service.pm
    },{
      id: "im",
      Header: "Implementador",
      accessor: d => d.service.im
    },{
      id: "serviceStatus",
      Header: "Status",
      accessor: d => d.service.status,
      filterMethod: (filter, row) => {
        if (filter.value === "all") {
          return true;
        }
        return row[filter.id] === filter.value;

      },
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option  value="all">Todos</option>
          <option  value="Init">Init</option>
          <option  >MeH</option>
          <option  >Pedido</option>
        </select>
    },]

    return (
      <AuthConsumer>
        {({ user }) => (
          <Can
            role={user.role}
            perform="services:list"
            yes={() =>
              <React.Fragment>
                <ReactTable
                  data={data}
                  columns={columns}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
                  defaultPageSize={10}
                />

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
