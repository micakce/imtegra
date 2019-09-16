import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
import { blankState } from './testVariables';
import { RenderADI, RenderL2VPN, RenderTTT, RenderHardware } from './RenderService';
import AddServiceModal from './AddServiceModal';
import AddHardwareModal from './AddHardwareModal';

export default class ViewClient extends Component {

    constructor(props) {
        super(props);

        if (props.client) {
            this.state = props.client;
        } else {
            this.state = blankState;
        }

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
        if (abonado) this.searchClient(null, abonado[0]);
    }

    searchClient(e, p) {
        const abonado = p || this.state.search || this.state.abonado
        fetch(`/clients/search/${abonado}`)
            .then(res => res.json())
            .then(data => {
                this.setState(data)
            })
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
                .then(res => console.log(res))
                .then(() => this.searchClient(null, this.state.abonado))
        }
    }

    render() {
        return (
            <div>
                <Form inline>
                    <FormControl type="text" placeholder="Search" onChange={this.handleSearchChange} value={this.state.search} className="mr-sm-2" />
                    <Button type="submit" variant="outline-success" onClick={this.searchClient}>Search</Button>
                </Form>
                <Card>
                    <Card.Header as="h5">Datos del Cliente</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col> {`${this.state.abonado} - ${this.state.name}`} </Col>
                                <Col> Informacion de Contacto </Col>
                                <Col> Contacto Tecnico </Col>
                            </Row>
                        </Card.Title>
                        <Row>
                            <Col>
                                <Row>
                                    <Col><b>Domicilio:</b> {` ${this.state.address.street}, ${this.state.address.apto}`} </Col>
                                </Row>
                                <Row>
                                    <Col><b>Localidad:</b> {` ${this.state.address.location}, ${this.state.address.city}`} </Col>
                                </Row>
                                <Row></Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col><b>Telefono:</b> {` ${this.state.telefono}`}</Col>
                                </Row>
                                <Row>
                                    <Col><b>Email:</b> {` ${this.state.email}`} </Col>
                                </Row>
                                <Row></Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col><b>Domicilio:</b> {` ${this.state.address.street}, ${this.state.address.apto}`} </Col>
                                </Row>
                                <Row>
                                    <Col><b>Localidad:</b> {` ${this.state.address.location}, ${this.state.address.city}`} </Col>
                                </Row>
                                <Row></Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Header as="h5">Servicios</Card.Header>
                    <Card.Body>
                        <Accordion >
                            {this.state.services.map((service, idx) => {
                                const WrappedAddServiceModal = () => {
                                    return <AddServiceModal id={service._id} idx={idx} action={"Edit"} hardware={this.state.hardware} service={service} reload={this.searchClient} abonado={this.state.abonado} />
                                }
                                if (service.service === "ADI") {

                                    return (
                                        <RenderADI id={service._id} deleteService={this.deleteService} wrapped={WrappedAddServiceModal} service={service} idx={idx} />
                                    )
                                } else if (service.service === "L2VPN") {
                                    return (
                                        <RenderL2VPN id={service._id} deleteService={this.deleteService} wrapped={WrappedAddServiceModal} service={service} idx={idx} />
                                    )
                                } else if (service.service === "TTT") {
                                    return (
                                        <RenderTTT id={service._id} deleteService={this.deleteService} wrapped={WrappedAddServiceModal} service={service} idx={idx} />
                                    )
                                } else {
                                    return (<div style={{ display: 'flex', justifyContent: 'center' }}><h3 >Agrega un Servicio</h3></div>)
                                }
                            })}
                            <br></br>
                            <AddServiceModal action={"Agregar Servicio"} reload={this.searchClient} hardware={this.state.hardware} abonado={this.state.abonado} />
                        </Accordion>
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Header as="h5">Hardware</Card.Header>
                    <Card.Body>
                        <Accordion >
                            {this.state.hardware.map((device, idx) => {
                                const WrappedAddHardwareModal = () => {
                                    return <AddHardwareModal id={device._id} idx={idx} action={"Edit"} device={device} reload={this.searchClient} abonado={this.state.abonado} />
                                }
                                return (
                                    <RenderHardware id={device._id} deleteDevice={this.deleteDevice} wrapped={WrappedAddHardwareModal} device={device} idx={idx} />
                                )
                            })}
                            <AddHardwareModal action={"Agregar Dispositivo"} reload={this.searchClient} abonado={this.state.abonado} />
                        </Accordion>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}