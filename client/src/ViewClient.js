import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { blankState } from './testVariables';
import { RenderService, RenderHardware } from './RenderService';
import AddServiceModal from './AddServiceModal';
import AddHardwareModal from './AddHardwareModal';
import AddClientModal from './AddClientModal';

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
        this.props.history.push(`/clients/client/${abonado}`)
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
      <div>
        <Form inline style={{position: 'absolute', right: 90, top: 8}}  >
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
          </Form>
          <Card>
            <Card.Header as="h5"> Datos del Cliente</Card.Header>
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
              <AddClientModal
                title="Editar"
                action="edit"
                client={this.state}
                hideEditButton={this.state.hideEditButton}
                reload={this.searchClient}
              />
            </div>

          </Card>

          <br></br>

          <Card>
            <Card.Header as="h5">Servicios</Card.Header>
            <Card.Body>
              <Accordion  >
                {
                  this.state.services.map((service, idx) => {
                    const WrappedAddServiceModal = () => (
                      <AddServiceModal
                        id={service._id}
                        idx={idx}
                        action={"Edit"}
                        hardware={this.state.hardware}
                        service={service}
                        reload={this.searchClient}
                        abonado={this.state.abonado} />
                    )

                    return <RenderService
                      id={service._id}
                      abonado={this.state.abonado}
                      clientName={this.state.name}
                      deleteService={this.deleteService}
                      wrapped={WrappedAddServiceModal}
                      service={service}
                      idx={idx} />
                  })
                }

                <br></br>
                <AddServiceModal
                  action={"Agregar Servicio"}
                  reload={this.searchClient}
                  hardware={this.state.hardware}
                  abonado={this.state.abonado} />
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
                      const WrappedAddHardwareModal = () => {
                        return <AddHardwareModal
                          id={device._id}
                          idx={idx}
                          action={"Edit"}
                          device={device}
                          reload={this.searchClient}
                          abonado={this.state.abonado} />
                      }
                      return (
                        <RenderHardware
                          id={device._id}
                          deleteDevice={this.deleteDevice}
                          wrapped={WrappedAddHardwareModal}
                          device={device}
                          idx={idx} />
                      )
                    })
                  }

                  <br></br>
                  <AddHardwareModal
                    action={"Agregar Dispositivo"}
                    reload={this.searchClient}
                    abonado={this.state.abonado} />
                  </Accordion>
                </Card.Body>
              </Card>
            </div>
    )
  }
}
