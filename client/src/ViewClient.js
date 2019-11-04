import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col, Form } from 'react-bootstrap';

import { blankState } from './testVariables';
import { RenderService, RenderHardware } from './RenderService';
import MyModal from './MyModal';
import AddService from './AddService';
import AddHardware from './AddHardware';
import AddClient from './AddClient';
import { AuthConsumer } from './authContext';
import Can from './Can';

export default class ViewClient extends Component {

  constructor(props) {
    super(props);

    this.state = blankState;

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.searchClient = this.searchClient.bind(this);
    this.deleteService = this.deleteService.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);

  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  componentDidMount() {

    const abonado = window.location.pathname.match(/\d.*$/)
    if (abonado) {
      this.setState({search: abonado})
      this.searchClient(null, abonado[0]);
    }
  }

  searchClient(e, p) {
    const abonado = p || this.state.search || this.state.abonado
    const path = `/clients/client/${abonado}`;
    fetch(path)
      .then(res => res.json())
      .then(data => {
        this.setState(data ? { ...data, hideEditButton: false } : blankState)
        // this.props.history.push(`/clients/client/${abonado}`)
      }
      )
      .catch(err => console.error(err));
    if (e) e.preventDefault();
  }

  deleteService(id) {
    if (window.confirm('Seguro que quieres eliminar este servicio?')) {
      fetch(`/clients/service/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ abonado: this.state.abonado }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => console.log(res))
        .then(() => this.searchClient(null, this.state.abonado))
    }
  }

  deleteDevice(id) {
    if (window.confirm('Seguro que quieres eliminar este dispositivo?')) {
      fetch(`/clients/device/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ abonado: this.state.abonado }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
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
                {/* <Form inline style={{position: 'absolute', right: 90, top: 8}}  > */}
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
                  abonado={this.state.abonado}
                  clientName={this.state.name}
                  clienteAddress={this.state.address}
                  deleteService={this.deleteService}
                  wrapped={WrappedAddServiceModal}
                  service={service}
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
          <Accordion >
            {
              this.state.hardware.map((device, idx) => {
                const WrappedAddHardwareModal = () => (

                  <Can
                    role={user.role}
                    perform="hardware:add"
                    yes={() => (
                      <MyModal
                        title="Editar Dispositivo"
                        buttonLabel="Editar"
                        render={ toggle => (
                          <AddHardware
                            id={device._id}
                            idx={idx}
                            device={device}
                            action={"Edit"}
                            toggle={toggle}
                            reload={this.searchClient}
                            abonado={this.state.abonado}
                          />
                        )}
                      />
                    )}
                  />

                )

                return (
                  <RenderHardware
                    id={device._id}
                    deleteDevice={this.deleteDevice}
                    wrapped={WrappedAddHardwareModal}
                    device={device}
                    idx={idx}
                  />
                )
              })
            }

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
                      toggle={toggle}
                      reload={this.searchClient}
                      abonado={this.state.abonado}
                    />
                  )}
                />
              )}
            />

          </Accordion>
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
