import React from 'react';
import { Card, Accordion, Row, Col } from 'react-bootstrap';

function RenderADI(props) {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                <b>{`${props.service.service} - ${props.service.speed}`}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idx}>
                <Card.Body >
                    <Card.Title>
                        <Row>
                            <Col>
                                Datos
                                                            </Col>
                            <Col>
                                Direccionamiento
                                                            </Col>
                            <Col>
                                Monitoria
                                                            </Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col>
                            <b>Servicio: </b>{` ${props.service.service} - ${props.service.speed} Mbps`}
                        </Col>
                        <Col>
                            {/* <b>IP: </b>{props.service.ip} */}
                            <b>Red: </b>{props.service.red}
                        </Col>
                        <Col>
                            <b>IP: </b>{props.service.ip_mon}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Tecnología: </b>{` ${props.service.tech}`}
                        </Col>
                        <Col>
                            <b>IP: </b>{props.service.ip}
                        </Col>
                        <Col>
                            <b>Mask: </b>{props.service.mask}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Equipo: </b>
                        </Col>
                        <Col>
                            <b>DG: </b>{props.service.dg}
                        </Col>
                        <Col>
                            <b>DG: </b>{props.service.dg_mon}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <b>Mask: </b>{props.service.mask}
                        </Col>
                        <Col>
                            <b>VLAN: </b> {props.service.vlan_mon}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <b>VLAN: </b>{props.service.vlan}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function RenderL2VPN(props) {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                <b>{`${props.service.service} - ${props.service.speed}`}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idx}>
                <Card.Body>
                    <Row>
                        <Col>
                            <b>Servicio: </b>{` ${props.service.service} - ${props.service.speed} Mbps`}
                        </Col>
                        <Col>
                            <b>Tipo: </b> {` ${props.service.type}`}
                        </Col>
                        <Col>
                            <b>IP: </b>{props.service.ip_mon}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Tecnología: </b>{` ${props.service.tech}`}
                        </Col>
                        <Col>
                            <b>Contra: </b>{props.service.contra}
                        </Col>
                        <Col>
                            <b>Mask: </b>{props.service.mask}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Equipo: </b>
                        </Col>
                        <Col>
                            <b>VLAN: </b>{props.service.vlan}
                        </Col>
                        <Col>
                            <b>DG: </b>{props.service.dg_mon}
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function RenderTTT(props) {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                <b>{`${props.service.service} - ${props.service.speed}`}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idx}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                Datos
                                                            </Col>
                            <Col>
                                Direccionamiento
                            </Col>
                            <Col>
                                Rango Numerico
                                </Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col>
                            <b>Servicio: </b>{` ${props.service.service} - ${props.service.speed} Mbps`}
                        </Col>
                        <Col>
                            <b>Red: </b>{props.service.red}
                        </Col>
                        <Col>
                            <b> Head: </b>{` ${props.service.head} `}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Tecnología: </b>{` ${props.service.tech}`}
                        </Col>
                        <Col>
                            <b>IP: </b>{props.service.ip}
                        </Col>
                        <Col>
                            <b> Tale: </b>{` ${props.service.tale} `}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Equipo: </b>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            <b> DG: </b>{` ${props.service.dg} `}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <b>Mask: </b>{props.service.mask}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                            <b>VLAN: </b>{props.service.vlan}
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Card.Body>

                {/* <Card.Body>
                    <Row>
                        <Col>
                            <b>Servicio: </b>{` ${props.service.service} - ${props.service.speed} Mbps`}
                        </Col>
                        <Col>
                            <b>Tipo: </b> {` ${props.service.type}`}
                        </Col>
                        <Col>
                            <b>IP: </b>{props.service.ip_mon}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Tecnología: </b>{` ${props.service.tech}`}
                        </Col>
                        <Col>
                            <b>Contra: </b>{props.service.contra}
                        </Col>
                        <Col>
                            <b>Mask: </b>{props.service.mask}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Equipo: </b>
                        </Col>
                        <Col>
                            <b>VLAN: </b>{props.service.vlan}
                        </Col>
                        <Col>
                            <b>DG: </b>{props.service.dg_mon}
                        </Col>
                    </Row>
                </Card.Body> */}
            </Accordion.Collapse>
        </Card>
    )
}
export { RenderADI, RenderL2VPN, RenderTTT };