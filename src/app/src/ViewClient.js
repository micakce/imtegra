import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { dangeloState } from './testVariables';
import { RenderADI, RenderL2VPN, RenderTTT } from './RenderService';

export default class ViewClient extends Component {
    constructor(props) {
        super(props);

        if (props.cliente) {
            this.state = props.cliente;
            console.log("Maldito cliente");
        } else {
            this.state = dangeloState;
            console.log("Maldito Estado");
        }

        // this.state = {
        //     client: props.client
        // }

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

    componentDidMount() {
        console.log(this.props);
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
                        <Button variant="primary">Go somewhere</Button>
                        {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card>
                <br></br>
                <Card>
                    <Card.Header as="h5">Servicios</Card.Header>
                    <Card.Body>
                        <Accordion >
                            {dangeloState.services.map((service, idx) => {
                                if (service.name === "ADI") {

                                    return (
                                        <RenderADI service={service} idx={idx} />
                                    )
                                } else if (service.name === "L2VPN") {
                                    return (
                                        <RenderL2VPN service={service} idx={idx} />
                                    )
                                } else if (service.name === "TTT") {
                                    return (
                                        <RenderTTT service={service} idx={idx} />
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