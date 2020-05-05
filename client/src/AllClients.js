import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Badge} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import AddClient from './AddClient';
import MyModal from './MyModal';
import{AuthConsumer} from "./authContext";
import Can from "./Can";
import { axiosInstance } from './helpers/axios';

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
      axiosInstance.delete(`/clients/${client_id}`, {client_id, service_id, what: "service"} )
        .then(res => res.json())
        .catch(err => console.error(err))
      this.fetchClients();
    }
  }

  deleteClient(client_id) {
    if (window.confirm('Seguro quieres eliminar este cliente?')) {
      axiosInstance.delete(`/clients/${client_id}`)
        .then(res => console.log(res.message))
        .then(data => console.log(data))
        .catch(err => console.error(err))
      this.fetchClients();
    }
  }

  fetchClients() {
    axiosInstance(`/clients/all`)
      .then(res => { this.setState({ clients: res.data }) })
      .catch(err => console.error(err));
  }

  render() {

    const cellStyle = { display: "table-cell", verticalAlign: "middle" };

    const data = [];
    const statuses = [];
    this.state.clients.forEach( client => {
      if (client.services.length > 0) {
        client.services.forEach( service => {
          if (service.status !== "Baja" &&
            service.status !== "Completado" &&
          service.status !== "Cumplido") {
            data.push({
              abonado: client.abonado,
              name: client.name,
              clientId: client._id,
              service
            })
          }
          if (!statuses.includes(service.status)){
            statuses.push(service.status);
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
      accessor: d => d.service.plan ? `${d.service.service} - ${d.service.plan} Mbps` : d.service.service,
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
          { statuses.map( status => <option>{status}</option> ) }
        </select>
    },]

    return (
      <AuthConsumer>
        {({ user }) => (
          <Can
            role={user.role}
            perform="services:list"
            yes={() =>
              <>
                <ReactTable
                  data={data}
                  columns={columns}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
                  defaultPageSize={15}
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
              </>
            }
            no={() => <Redirect to="/" />}
          />
        )}
      </AuthConsumer>
    )
  }
}
