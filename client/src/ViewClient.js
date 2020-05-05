import React, { Component } from 'react';
import { Accordion, Card, Button, Table,  Row, Col, Form } from 'react-bootstrap';

import { blankState } from './testVariables';
import RenderService from './RenderService';
import MyModal from './MyModal';
import AddService from './AddService';
import AddHardware from './AddHardware';
import AddClient from './AddClient';
import EditHardwareModal from './EditHardwareModal';
import { AuthConsumer } from './authContext';
import Can from './Can';
import {axiosInstance} from './helpers/axios';

export default class ViewClient extends Component {

  constructor(props) {
    super(props);

    this.state = blankState;

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchClient = this.searchClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);

  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  componentDidMount() {

    const abonado = window.location.pathname.match(/\/(\d{7}$)/)
    if (abonado) {
      console.log(abonado);
      this.setState({search: abonado[1]})
      this.searchClient(null, abonado[1]);
    }
  }

  searchClient(e, p) {
    const abonado = p || this.state.search || this.state.abonado
    const path = `/clients/client/${abonado}`;
    axiosInstance.get(path)
      .then( res => {
        this.setState(res.data ? {...res.data, hideEditButton: false} : blankState)
      }).catch(err => console.log(err));
    if (e) e.preventDefault();
  }

  deleteClient(client_id) {
    if (window.confirm('Seguro quieres eliminar este cliente?')) {
      axiosInstance.delete(`/clients/${client_id}`)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
      this.props.history.replace('/clients/all');
    }
  }

  deleteService(id) {
    if (window.confirm('Seguro que quieres eliminar este servicio?')) {
      axiosInstance.delete(`/clients/${this.state.abonado}/service/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .then(() => this.searchClient(null, this.state.abonado))
    }
  }

  deleteDevice(id) {
    if (window.confirm('Seguro que quieres eliminar este dispositivo?')) {
      axiosInstance.delete(`/clients/${this.state.abonado}/device/${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .then(() => this.searchClient(null, this.state.abonado))
    }
  }

  render() {
    return (
      <AuthConsumer>
        { ({ user }) => (
          <Can
            role={user.role}
            perform="clients:view"
            yes={() => (
              <>
                <Card>
                  <Card.Header as="h5">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        Datos del Cliente
                      </div>
                      <Form inline  >
                        <Form.Control
                          type="text"
                          placeholder="Search"
                          onChange={this.handleSearchChange}
                          value={this.state.search}
                          className="mr-sm-2" />
                        <Button
                          type="submit"
                          variant="outline-success"
                          onClick={this.searchClient}>Search</Button>
                        </Form></div></Card.Header>
                        <Card.Body>
                          <Row>
                            <Col>
                              <Card.Title> {`${this.state.abonado} - ${this.state.name}`} </Card.Title>
                              <div><b>Domicilio:</b> {` ${this.state.address.street}, ${this.state.address.apto}`} </div>
                              <div><b>Localidad:</b> {` ${this.state.address.location}, ${this.state.address.city}`} </div>
                            </Col>
                            <Col>
                              <Card.Title> Informacion de Contacto </Card.Title>
                              <div><b>Telefono:</b> {` ${this.state.telefono}`}</div>
                              <div><b>Email:</b> {` ${this.state.email}`} </div>
                            </Col>
                            <Col>
                              <Card.Title> Contacto Tecnico </Card.Title>
                              <div><b>Domicilio:</b> {` ${this.state.address.street}, ${this.state.address.apto}`} </div>
                              <div><b>Localidad:</b> {` ${this.state.address.location}, ${this.state.address.city}`} </div>
                            </Col>
                          </Row>
                        </Card.Body>
                        <br></br>
                        <div className="text-right mr-3 mb-3">
                          <Can
                            role={user.role}
                            perform="clients:edit"
                            yes={() => (
                              <MyModal
                                buttonLabel="Editar"
                                hideEditButton={this.state.hideEditButton}
                                title="Editar Cliente"
                                render={ toggle => (
                                  <AddClient
                                    toggle={toggle}
                                    action="edit"
                                    client={this.state}
                                    reload={this.searchClient}
                                  />
                                )}
                              />
                            )}
                          />
                          {' '}

                          <Can
                            role={user.role}
                            perform="clients:delete"
                            yes={() => (
                              <Button
                                variant="danger"
                                onClick={() => this.deleteClient(this.state._id)}
                                // onClick={() => console.log(this.state)}
                                hidden={this.state.hideEditButton}
                              >
                                Eliminar
                              </Button>
                            )}
                          />
                        </div>
                      </Card>

                      <br></br>

                      <Card>
                        <Card.Header as="h5">Servicios</Card.Header>
                        <Card.Body>
                          <Accordion  >
                            { this.state.services.map((service, idx) => {
                              const WrappedAddServiceModal = () => (
                                <Can
                                  role={user.role}
                                  perform="clients:add"
                                  yes={() => (
                                    <MyModal
                                      title="Agregar Servicio"
                                      buttonLabel="Edit"
                                      render={ toggle => (
                                        <AddService
                                          toggle={toggle}
                                          id={service._id}
                                          idx={idx}
                                          action="Edit"
                                          reload={this.searchClient}
                                          service={service}
                                          hardware={this.state.hardware}
                                          abonado={this.state.abonado}
                                        />
                                      )}
                                    />
                                  )}
                                />
                              )

                              return (
                                <RenderService
                                  id={service._id}
                                  key={idx.toString()}
                                  abonado={this.state.abonado}
                                  clientName={this.state.name}
                                  clientAddress={this.state.address}
                                  deleteService={this.deleteService}
                                  wrapped={WrappedAddServiceModal}
                                  service={service}
                                  hardware={this.state.hardware}
                                  idx={idx}
                                />
                              )
                            })
                            }

                            <br></br>

                            <Can
                              role={user.role}
                              perform="services:add"
                              yes={() => (
                                <MyModal
                                  title="Agregar Servicio"
                                  buttonLabel="Agregar"
                                  render={ toggle => (
                                    <AddService toggle={toggle}
                                    action="Agregar"
                                    reload={this.searchClient}
                                    hardware={this.state.hardware}
                                    abonado={this.state.abonado}
                                  />
                                  )}
                                />
                              )}
                            />

                          </Accordion>
                        </Card.Body>
                      </Card>

                      <br></br>
                      <Card>
                        <Card.Header as="h5">Hardware</Card.Header>
                        <Card.Body>
                          <Table size="sm" bordered hover striped>
                            <thead>
                              <tr>
                                <th>Dispositivo</th>
                                <th>Modelo</th>
                                <th>Serial</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                              this.state.hardware.map((device, idx) => {

                                return (

                                  <EditHardwareModal
                                    id={device._id}
                                    key={idx.toString()}
                                    deleteDevice={this.deleteDevice}
                                    // canEdit={CanEditHardware}
                                    device={device}
                                    idx={idx}
                                    render={ toggle => (
                                      <AddHardware
                                        id={device._id}
                                        idx={idx}
                                        device={device}
                                        action={"Edit"}
                                        toggle={toggle}
                                        reload={this.searchClient}
                                        abonado={this.state.abonado}
                                        deleteDevice={this.deleteDevice}
                                      />
                                    )}
                                  />
                                )
                              })
                            }
                            </tbody>
                          </Table>

                            <br></br>

                            <Can
                              role={user.role}
                              perform="hardware:add"
                              yes={() => (
                                <MyModal
                                  title="Agregar Dispositivo"
                                  buttonLabel="Agregar"
                                  render={ toggle => (
                                    <AddHardware
                                      action={"Add"}
                                      toggle={toggle}
                                      reload={this.searchClient}
                                      abonado={this.state.abonado}
                                    />
                                  )}
                                />
                              )}
                            />
                        </Card.Body>
                      </Card>
                    </>
            )}
          />
        )}
      </AuthConsumer>

    )
  }
}
