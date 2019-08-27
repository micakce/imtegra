import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { dangeloState } from './testVariables';

export default class ClientMain extends Component {
    constructor(props) {
        super(props);
        this.state = dangeloState;
        // this.state = {
        //     abonado: "",
        //     name: "",
        //     telefono: "",
        //     email: "",
        //     address: {
        //         street: "",
        //         apto: "",
        //         location: "",
        //         city: ""
        //     },
        //     services: [
        //         {
        //             service: "",
        //             speed: "",
        //         }
        //     ],
        //     pm: "",
        //     im: "",
        //     status: ""
        // }
    }


    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="h5">Datos del Cliente</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col>
                                    {`${this.state.abonado} - ${this.state.name}`}
                                </Col>
                                <Col>
                                    Informacion de Contacto
                            </Col>
                                <Col>
                                    Contacto Tecnico
                            </Col>
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
                        {/* <Button variant="primary">Go somewhere</Button>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Header as="h5">Servicios</Card.Header>
                    <Card.Body>
                        <Accordion >
                            {dangeloState.services.map(service => {
                                if (service.name === "ADI") {

                                    return (
                                        <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                           <b>{`${service.name} - ${service.speed}`}</b>
                                    </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            <Row>
                                                <Col>
                                                <b>Servicio: </b>{` ${service.name} - ${service.speed} Mbps`}
                                                </Col>
                                                <Col>
                                                <b>Servicio: </b>{` ${service.name} - ${service.speed} Mbps`}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                <b>Tecnología: </b>{` ${service.tech}`}
                                                </Col>
                                            </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            }
                            })}
                        </Accordion>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}