import React, { useState } from 'react';
import { Badge, Button, Card, Accordion, Row, Col } from 'react-bootstrap';

import PrintCCADI from './templates/PrintCCADI';
import PrintOSADI from './templates/PrintOSADI';
import PrintOSL2VPN from './templates/PrintOSL2VPN';

import CreateConfigModal from './CreateConfigModal';
import CreateDiagramModal from './CreateDiagramModal';
import { AuthConsumer } from "./authContext";
import MyModal from './MyModal';
import Can from "./Can";

const CanDeleteService = ({ deleteService }) => (
  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="services:delete"
        yes={() => (
          <Button onClick={deleteService} variant='danger'> Eliminar </Button>
        )}
      />
    )}
  </AuthConsumer>
)

const AccordionToggle = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion.Toggle as={Card.Header} eventKey={props.idx} onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }} >
      <Row className="d-flex justify-content-end" >
        {expanded ? '-' : '+'}
        <Col className=" text-center" >
          <b className="mr-2">{`${props.service.service} - ${props.service.plan}`}</b>
          {props.service.medium === 'CO' ? <Badge variant="primary">{props.service.medium}</Badge> : <Badge variant="warning">{props.service.medium}</Badge>}
        </Col><b className="text-muted">|</b>
        <Col className=" text-center" >
          <b>PM:</b> {props.service.pm}
        </Col><b className="text-muted">|</b>
        <Col className=" text-center" >
          <b>IM:</b> {props.service.im}
        </Col><b className="text-muted">|</b>
        <Col className=" text-center" >
          <b>Status:</b> <Badge variant="success">{props.service.status}</Badge>
        </Col>
      </Row>
    </Accordion.Toggle>
  )
}

function RenderService(props) {
  if (props.service.service === 'ADI') {
    if (props.service.medium === "FO") {
      return (
        <Card>
          <AccordionToggle {...props} />
          <Accordion.Collapse eventKey={props.idx}>
            <Card.Body >
              <Row>
                <Col>
                  <Card.Title> Datos </Card.Title>
                  <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                  <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                  <div> <b>Equipo: </b>  {props.service.device}</div>
                  <div> <b>Interfaz: </b> {props.service.interface} </div>
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
                  <div> <b>Hub: </b>{props.service.hub} - <b>Obra: </b> {props.service.obra ?  props.service.obra : ""}</div>
                  <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                  <div> <b>Switch: </b>{props.service.nexus} </div>
                  <div> <b>Port: </b>{props.service.nexus_port} </div>
                  <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                  <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
                </Col>
              </Row>

              <br></br>
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
              {' '}
              <CreateConfigModal {...props} template='ADI' />
              {' '}
              <CreateDiagramModal {...props} template='ADI' />
              {' '}
              <MyModal
                title="Print Comodato"
                buttonLabel="PrintCC"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintCCADI
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
              {' '}
              <MyModal
                title="Print OS"
                buttonLabel="PrintOS"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintOSADI
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

    } else if (props.service.medium === "CO") {
      return (
        <Card>
          <AccordionToggle {...props} />
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
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
              {' '}
              <CreateConfigModal {...props} template='ADI_CO' />
              {' '}
              <CreateDiagramModal {...props} template='ADI_CO' />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
  } else if (props.service.service === 'L2VPN') {
    if (props.service.medium === "FO") {
      return (
        <Card>
          <AccordionToggle {...props} />
          <Accordion.Collapse eventKey={props.idx}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>Datos</Card.Title>
                  <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                  <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                  <div> <b>Equipo: </b>  {props.service.device}</div>
                  <div> <b>Interfaz: </b> {props.service.interface} </div>
                </Col>
                <Col>
                  <Card.Title>TLS</Card.Title>
                  <div> <b>Tipo: </b> {` ${props.service.mode}`} </div>
                  {props.service.mode === 'Punto Multipunto'
                    ?
                      (<><div>
                        <b>Concentrador: </b> <Badge variant="info" className="mx-1" > {props.service.sites.hub}</Badge>
                      </div>
                        <div>
                          <b>Spokes: </b>
                          {props.service.sites.spokes
                            ? props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                            : ''}
                        </div></>)
                        :
                          <div>
                            <b>Contra: </b>
                            {props.service.sites.spokes
                              ?
                                props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                                :
                                ''}
                          </div>
                  }
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
                  <div> <b>Hub: </b>{props.service.hub} - <b>Obra: </b> {props.service.obra ?  props.service.obra : ""}</div>
                  <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                  <div> <b>Switch: </b>{props.service.nexus} </div>
                  <div> <b>Port: </b>{props.service.nexus_port} </div>
                  <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                  <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
                </Col>
              </Row>
              <br></br>
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
              {' '}
              <CreateConfigModal {...props} template='L2VPN' />
              {' '}
              <CreateDiagramModal {...props} template='L2VPN' />
              {' '}
              <MyModal
                title="Print Comodato"
                buttonLabel="PrintCC"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintCCADI
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
              {' '}
              <MyModal
                title="Print OS"
                buttonLabel="PrintOS"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintOSL2VPN
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

    } else if (props.service.medium === "CO") {
      return (
        <Card>
          <AccordionToggle {...props} />
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
                  {props.service.mode === 'Punto Multipunto'
                    ?
                      (<><div>
                        <b>Concentrador: </b> <Badge variant="info" className="mx-1" > {props.service.sites.hub}</Badge>
                      </div>
                        <div>
                          <b>Spokes: </b>
                          {props.service.sites.spokes
                            ? props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                            : ''}
                        </div></>)
                        :
                          <div>
                            <b>Contra: </b>
                            {props.service.sites.spokes
                              ?
                                props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                                :
                                ''}
                          </div>
                  }
                  <div> <b>VLAN: </b>{props.service.vlan} </div>
                </Col>
              </Row>
              <br></br>
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
              {' '}
              <CreateConfigModal {...props} template='L2VPN_CO' />
              {' '}
              <CreateDiagramModal {...props} template='L2VPN_CO' />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
  } else if (props.service.service === 'L3VPN') {
    if (props.service.medium === "FO") {
      return (
        <Card>
          <AccordionToggle {...props} />
          <Accordion.Collapse eventKey={props.idx}>
            <Card.Body >
              <Row>
                <Col>
                  <Card.Title> Datos </Card.Title>
                  <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                  <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                  <div> <b>Switch: </b>  {props.service.device}</div>
                  <div> <b>Interfaz: </b> {props.service.interface} </div>
                  <div> <b>Router: </b>  {props.service.device_router}</div>
                  <div> <b>Interfaz: </b> {props.service.interface_router} </div>
                </Col>
                <Col>
                  <Card.Title>VPN</Card.Title>
                  <div> <b>Tipo: </b> {` ${props.service.mode}`} </div>
                  {props.service.mode === 'Punto Multipunto'
                    ?
                      (<><div>
                        <b>Hub: </b> <Badge variant="info" className="mx-1" > {props.service.sites.hub}</Badge>
                      </div>
                        <div>
                          <b>Spokes: </b>
                          {props.service.sites.spokes
                            ? props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                            : ''}
                        </div></>)
                        :
                          <div>
                            <b>Contra: </b>
                            {props.service.sites.spokes
                              ?
                                props.service.sites.spokes.split(',').map(spoke => <Badge variant="secondary" className="mx-1">{spoke}</Badge>)
                                :
                                ''}
                          </div>
                  }
                  <div> <b>VLAN: </b>{props.service.vlan} </div>
                </Col>
                <Col>
                  <Card.Title> Direccionamiento </Card.Title>
                  <div>WAN</div>
                  <div> <b>Red: </b>{props.service.red} </div>
                  <div> <b>IP: </b>{props.service.ip} </div>
                  <div> <b>DG: </b>{props.service.dg} </div>
                  <div> <b>Mask: </b>{props.service.mask} </div>
                  <div>LAN</div>
                  <div> <b>Red: </b>{props.service.lan_red} </div>
                  <div> <b>IP: </b>{props.service.lan_ip} </div>
                  <div> <b>DG: </b>{props.service.lan_dg} </div>
                  <div> <b>Mask: </b>{props.service.lan_mask} </div>
                </Col>
                <Col>
                  <Card.Title>Monitoria</Card.Title>
                  <div> <b>Switch: </b>{props.service.ip_mon} </div>
                  <div> <b>Router: </b>{props.service.ip_mon_router} </div>
                  <div> <b>DG: </b>{props.service.dg_mon} </div>
                  <div> <b>Mask: </b>{props.service.mask_mon} </div>
                  <div> <b>VLAN: </b> {props.service.vlan_mon} </div>
                </Col>
                <Col>
                  <Card.Title>Patcheo</Card.Title>
                  <div> <b>Hub: </b>{props.service.hub} - <b>Obra: </b> {props.service.obra ?  props.service.obra : ""}</div>
                  <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                  <div> <b>Switch: </b>{props.service.nexus} </div>
                  <div> <b>Port: </b>{props.service.nexus_port} </div>
                  <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                  <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
                </Col>
              </Row>

              <br></br>
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
              {' '}
              <MyModal
                title="Print Comodato"
                buttonLabel="PrintCC"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintCCADI
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
              {' '}
              <MyModal
                title="Print OS"
                buttonLabel="PrintOS"
                size="lg"
                color="secondary"
                render={ toggle => (
                  <PrintOSL2VPN
                    {...props}
                    toggle={toggle}
                  />
                )}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

    } else if (props.service.medium === "CO") {
      return (
        <Card>
          <AccordionToggle {...props} />
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
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
  } else if (props.service.service === 'TTT') {
    if (props.service.medium === "FO") {
      return (
        <Card>
          <AccordionToggle {...props} />
          <Accordion.Collapse eventKey={props.idx}>
            <Card.Body >
              <Row>
                <Col>
                  <Card.Title> Datos </Card.Title>
                  <div> <b>Servicio: </b>{` ${props.service.service} - ${props.service.plan} Mbps`} </div>
                  <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${props.service.medium}`} </Badge> </div>
                  <div> <b>Equipo: </b>  {props.service.device}</div>
                  <div> <b>Interfaz: </b> {props.service.interface} </div>
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
                  <div> <b>Hub: </b>{props.service.hub} - <b>Obra: </b> {props.service.obra ?  props.service.obra : ""}</div>
                  <div> <b>Patcheo: </b>{props.service.rack} - {props.service.patchera} - {props.service.position} </div>
                  <div> <b>Switch: </b>{props.service.nexus} </div>
                  <div> <b>Port: </b>{props.service.nexus_port} </div>
                  <div> <b>Dist: </b>{props.service.dist ? `${props.service.dist} mts` : ""} </div>
                  <div> <b>Att: </b>{props.service.att ? `${props.service.att} dB` : ""} </div>
                </Col>
              </Row>

              <br></br>
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

    } else if (props.service.medium === "CO") {
      return (
        <Card>
          <AccordionToggle {...props} />
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
              <CanDeleteService deleteService={() => props.deleteService(props.id)} />
              {' '}
              {props.wrapped()}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
  }
}

export default RenderService;
