import React from 'react';
import { Badge, Button, Card, Accordion, Row, Col } from 'react-bootstrap';

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
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>Equipo: </b>  {props.service.device}</div>
                                <div> <b>Interfaz: </b> {props.service.interfaz} </div>
                            </Col>
                            <Col>
                                <Card.Title> Direccionamiento </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>IP: </b>{props.service.ip} </div>
                                <div> <b>DG: </b>{props.service.dg} </div>
                                <div> <b>Mask: </b>{props.service.mask} </div>
                                <div> <b>VLAN: </b>{props.service.vlan} </div>
                            </Col>
                            <Col>
                                <Card.Title> Monitoria </Card.Title>
                                <div> <b>IP: </b>{props.service.ip_mon} </div>
                                <div> <b>DG: </b>{props.service.dg_mon} </div>
                                <div> <b>Mask: </b>{props.service.mask_mon} </div>
                                <div> <b>VLAN: </b> {props.service.vlan_mon} </div>
                            </Col>
                            <Col>
                                <Card.Title>Patcheo</Card.Title>
                                <div> <b>Hub: </b>{props.service.hub} {props.service.obra ? `/${props.service.obra}` : ""}</div>
                                <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                                <div> <b>Switch: </b>{props.service.nexus} </div>
                                <div> <b>Port: </b>{props.service.nexus_port} </div>
                                <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                                <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
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
                                <Card.Title> Datos </Card.Title>
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="primary"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>HUB: </b> {props.service.hub} </div>
                                <div> <b>CMTS: </b> {props.service.cmts} </div>
                                <div> <b>MAC: </b>  {props.service.mac} </div>
                            </Col>
                            <Col md={4} sm={12} className="mx-auto" >
                                <Card.Title> Direccionamiento </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>IP: </b>{props.service.ip} </div>
                                <div> <b>DG: </b>{props.service.dg} </div>
                                <div> <b>Mask: </b>{props.service.mask} </div>
                                <div> <b>VLAN: </b> {props.service.vlan} </div>
                            </Col>
                        </Row>
                        <br ></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
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
                        <Row>
                            <Col>
                                <Card.Title>Datos</Card.Title>
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>Equipo: </b>  {props.service.device}</div>
                                <div> <b>Interfaz: </b> {props.service.interfaz} </div>
                            </Col>
                            <Col>
                                <Card.Title>TLS</Card.Title>
                                <div> <b>Tipo: </b> {` ${props.service.mode}`} </div>
                                <div> <b>Contra: </b>{props.service.sites.split(',').map(site => <Badge variant="secondary" className="mx-1">{site}</Badge>)} </div>
                                <div> <b>VLAN: </b>{props.service.vlan} </div>
                            </Col>
                            <Col>
                                <Card.Title>Monitoria</Card.Title>
                                <div> <b>IP: </b>{props.service.ip_mon} </div>
                                <div> <b>DG: </b>{props.service.dg_mon} </div>
                                <div> <b>Mask: </b>{props.service.mask_mon} </div>
                                <div> <b>VLAN: </b> {props.service.vlan_mon} </div>
                            </Col>
                            <Col>
                                <Card.Title>Patcheo</Card.Title>
                                <div> <b>Hub: </b>{props.service.hub} {props.service.obra ? `/ ${props.service.obra}` : ""}</div>
                                <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                                <div> <b>Switch: </b>{props.service.nexus} </div>
                                <div> <b>Port: </b>{props.service.nexus_port} </div>
                                <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                                <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
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

    } else if (props.service.medium === "CO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body>
                        <Row>
                            <Col md={4} className="mx-auto" >
                                <Card.Title> Datos </Card.Title>
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="primary"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>HUB: </b> {props.service.hub} </div>
                                <div> <b>CMTS: </b> {props.service.cmts} </div>
                                <div> <b>MAC: </b>  {props.service.mac} </div>
                            </Col>
                            <Col md={4} className="mx-auto" >
                                <Card.Title>TLS</Card.Title>
                                <div> <b>Tipo: </b> {` ${props.service.mode}`} </div>
                                <div> <b>Contra: </b>{props.service.sites.split(',').map(site => <Badge variant="secondary" className="mx-1">{site}</Badge>)} </div>
                                <div> <b>VLAN: </b>{props.service.vlan} </div>
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
    }
}

function RenderTTT(props) {
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
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>Equipo: </b>  {props.service.device}</div>
                                <div> <b>Interfaz: </b> {props.service.interfaz} </div>
                                <div> <b>Cabecera: </b> {props.service.nhead} </div>
                                <div> <b>Cola: </b> {props.service.ntale} </div>
                            </Col>
                            <Col>
                                <Card.Title> Direccionamiento </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>IP: </b>{props.service.ip} </div>
                                <div> <b>DG: </b>{props.service.dg} </div>
                                <div> <b>Mask: </b>{props.service.mask} </div>
                                <div> <b>VLAN: </b>{props.service.vlan} </div>
                            </Col>
                            <Col>
                                <Card.Title> Monitoria </Card.Title>
                                <div> <b>IP: </b>{props.service.ip_mon} </div>
                                <div> <b>DG: </b>{props.service.dg_mon} </div>
                                <div> <b>Mask: </b>{props.service.mask_mon} </div>
                                <div> <b>VLAN: </b> {props.service.vlan_mon} </div>
                            </Col>
                            <Col>
                                <Card.Title>Patcheo</Card.Title>
                                <div> <b>Hub: </b>{props.service.hub} {props.service.obra ? `/${props.service.obra}` : ""}</div>
                                <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                                <div> <b>Switch: </b>{props.service.nexus} </div>
                                <div> <b>Port: </b>{props.service.nexus_port} </div>
                                <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                                <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
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

    } else if (props.service.medium === "CO") {
        return (
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.idx}>
                    <b>{`${props.service.service} - ${props.service.plan}`}</b>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.idx}>
                    <Card.Body >
                        <Row >
                            <Col md={3} sm={12} className="mx-auto" >
                                <Card.Title> Datos </Card.Title>
                                <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                                <div> <b>Tecnología: </b> <Badge variant="primary"> {` ${props.service.medium}`} </Badge> </div>
                                <div> <b>Cabecera: </b>{props.service.nhead} </div>
                                <div> <b>Cola: </b>{props.service.ntale} </div>
                            </Col>
                            <Col md={3} sm={12} className="mx-auto" >
                                <Card.Title> Direccionamiento </Card.Title>
                                <div> <b>Red: </b>{props.service.red} </div>
                                <div> <b>IP: </b>{props.service.ip} </div>
                                <div> <b>DG: </b>{props.service.dg} </div>
                                <div> <b>Mask: </b>{props.service.mask} </div>
                                <div> <b>VLAN: </b> {props.service.vlan} </div>
                            </Col>
                            <Col md={3} sm={12} className="mx-auto" >
                                <Card.Title> Equipamiento </Card.Title>
                                <div> <b>HUB: </b> {props.service.hub} </div>
                                <div> <b>CMTS: </b> {props.service.cmts} </div>
                                <div> <b>MAC: </b>  {props.service.mac} </div>
                            </Col>
                        </Row>
                        <br ></br>
                        <Button onClick={() => props.deleteService(props.id)} variant='danger'> Eliminar </Button>
                        {' '}
                        {props.wrapped()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        )
    }
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