import React from 'react';
import { Button, Card, Accordion, Row, Col } from 'react-bootstrap';

function RenderADI(props) {
    if (props.service.medium === "FO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body >
                        <Row>
                            <Col>
                                <Card.Title> Datos </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>Tecnología: </b> {props.service.medium} </div>
                                <div> <b>Equipo: </b>  {props.service.device}</div>
                                <div> <b>Interfaz: </b> {props.service.interfaz} </div>
                            </Col>
                            <Col>
                                <Card.Title> Direccionamiento </Card.Title>
                            </Col>
                            <Col>
                                <Card.Title> Monitoria </Card.Title>
                                <div> <b>IP: </b>{props.service.ip_mon} </div>
                            </Col>
                            <Col>
                                <Card.Title> Obra </Card.Title>
                            </Col>
                        </Row>


                        <Col> <b>Hub: </b>{props.service.hub} </Col>


                        <Col> <b>Mask: </b>{props.service.mask} </Col>
                        <Col> <b>Patcheo: </b>{props.service.rack} - {props.service.pat} - {props.service.pos} </Col>


                        <Col> <b>DG: </b>{props.service.dg} </Col>
                        <Col> <b>DG: </b>{props.service.dg_mon} </Col>
                        <Col> <b>Dist: </b>{props.service.distance} </Col>


                        <Col> <b>Mask: </b>{props.service.mask} </Col>
                        <Col> <b>VLAN: </b> {props.service.vlan_mon} </Col>
                        <Col> <b>Att: </b>{props.service.att} </Col>


                        <Col> </Col>
                        <Col> <b>VLAN: </b>{props.service.vlan} </Col>
                        <Col> </Col>
                        <Col> </Col>

                        <br></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )

    } else if (props.service.medium === "CO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body >
                        <Row >
                            <Col md={4} sm={12} className="mx-auto" >
                                <Card.Title>
                                    <Col> Datos </Col>
                                </Card.Title>
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> Coaxil </div>
                                <div><b>HUB: </b> {props.service.hub} </div>
                                <div> <b>CMTS: </b> {props.service.cmts} </div>
                                <div> <b>MAC: </b>  {props.service.mac} </div>
                            </Col>
                            <Col md={4} sm={12} className="mx-auto" >
                                <Card.Title>
                                    <Col> Direccionamiento </Col>
                                </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>IP: </b>{props.service.ip} </div>
                                <div> <b>DG: </b>{props.service.dg} </div>
                                <div> <b>Mask: </b>{props.service.mask} </div>
                                <div> <b>VLAN: </b> {props.service.vlan} </div>
                            </Col>
                        </Row>
                        <br></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    } else {
        return (
            "Nothing to return"
        )
    }
}

function RenderL2VPN(props) {
    if (props.service.medium === "FO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body>
                        <Row key={props.idx}>
                            <Col> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </Col>
                            <Col> <b>Tipo: </b> {` ${props.service.mode}`} </Col>
                            <Col> <b>IP: </b>{props.service.ip_mon} </Col>
                        </Row>
                        <Row>
                            <Col> <b>Tecnología: </b>{` ${props.service.medium}`} </Col>
                            <Col> <b>Contra: </b>{props.service.sites} </Col>
                            <Col> <b>Mask: </b>{props.service.mask_mon} </Col>
                        </Row>
                        <Row>
                            <Col> <b>Equipo: </b>  {props.service.device}</Col>
                            <Col> <b>VLAN: </b>{props.service.vlan} </Col>
                            <Col> <b>DG: </b>{props.service.dg_mon} </Col>
                        </Row>
                        <br></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    } else if (props.service.medium === "CO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body>
                        <Row>
                            <Col> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </Col>
                            <Col> <b>Tipo: </b> {` ${props.service.mode}`} </Col>
                            {/* <Col> <b>IP: </b>{props.service.ip_mon} </Col> */}
                        </Row>
                        <Row>
                            <Col> <b>Tecnología: </b>{` ${props.service.medium}`} </Col>
                            <Col> <b>Contra: </b>{props.service.sites} </Col>
                            {/* <Col> <b>Mask: </b>{props.service.mask} </Col> */}
                        </Row>
                        <Row>
                            <Col> <b>Equipo: </b>  {props.service.device}</Col>
                            <Col> <b>VLAN: </b>{props.service.vlan} </Col>
                            {/* <Col> <b>DG: </b>{props.service.dg_mon} </Col> */}
                        </Row>
                        <br></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
}

function RenderTTT(props) {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                <b>{`${props.service.service} - ${props.service.plan}`}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idx}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col> Datos </Col>
                            <Col> Direccionamiento </Col>
                            <Col> Rango Numerico </Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan}`} </Col>
                        <Col> <b>Red: </b>{props.service.red} </Col>
                        <Col> <b> Head: </b>{props.service.nhead} </Col>
                    </Row>
                    <Row>
                        <Col> <b>Tecnología: </b>{props.service.medium} </Col>
                        <Col> <b>IP: </b>{props.service.ip} </Col>
                        <Col> <b> Tale: </b>{props.service.ntale} </Col>
                    </Row>
                    <Row>
                        <Col> <b>Equipo: </b>  {props.service.device}</Col>
                        <Col> </Col>
                        <Col> <b> DG: </b>{props.service.dg} </Col>
                    </Row>
                    <Row>
                        <Col> </Col>
                        <Col> <b>Mask: </b>{props.service.mask} </Col>
                        <Col> </Col>
                    </Row>
                    <Row>
                        <Col> </Col>
                        <Col> <b>VLAN: </b>{props.service.vlan} </Col>
                        <Col> </Col>
                    </Row>
                    <br></br>
                    <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                    {' '}
                    {props.wrapped()}
                </Card.Body>

            </Accordion.Collapse>
        </Card>
    )
}

function RenderHardware(props) {

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                <b>{`${props.device.device} - ${props.device.model}`}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.idx}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>Detalles</Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Col><b>Serial: </b>{props.device.serial}</Col>
                        <Col><b>Descripcion: </b>{props.device.description}</Col>
                    </Row>
                    <br></br>
                    <Button onClick={() => props.deleteDevice(props.id)} variant='danger'> Eliminar </Button>
                    {' '}
                    {props.wrapped()}
                </Card.Body>

            </Accordion.Collapse>
        </Card>
    )
}

export { RenderADI, RenderL2VPN, RenderTTT, RenderHardware };