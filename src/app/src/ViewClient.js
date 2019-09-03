import React, { Component } from 'react';
import { Accordion, Card, Button, Row, Col, Form, FormControl } from 'react-bootstrap';
import { blankState } from './testVariables';
import { RenderADI, RenderL2VPN, RenderTTT } from './RenderService';
import MyModal from './MyModal';
import AddService from './AddService';

export default class ViewClient extends Component {

    constructor(props) {
        super(props);

        if (props.client) {
            this.state = props.client;
        } else {
            this.state = { search: "", ...blankState };
            console.log("Maldito Estado");
            console.log(this.state);
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.searchClient = this.searchClient.bind(this);

    }

    handleSearchChange(e) {
        this.setState({
            search: e.target.value
        })
    }

    searchClient(e) {
        fetch(`/clients/search/${this.state.search}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ ...data })
            })
            .catch(err => console.error(err));
        e.preventDefault();
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
                            {this.state.services.map((service, idx) => {
                                if (service.service === "ADI") {

                                    return (
                                        <RenderADI service={service} idx={idx} />
                                    )
                                } else if (service.service === "L2VPN") {
                                    return (
                                        <RenderL2VPN service={service} idx={idx} />
                                    )
                                } else if (service.service === "TTT") {
                                    return (
                                        <RenderTTT service={service} idx={idx} />
                                    )
                                } else {
                                    return (<div style={{ display: 'flex', justifyContent: 'center' }}><h3 >Agrega un Servicio</h3></div>)
                                }
                            })}
                            <MyModal abonado={this.state.abonado}/>
                        </Accordion>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}