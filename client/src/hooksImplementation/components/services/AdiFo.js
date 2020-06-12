import React from 'react';
import MyInputGroup from "./MyInputGroup";
import EditServiceModal from "./EditServiceModal";
import {
  Badge,
  Row,
  Card,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";

const AdiFo = (props) => {
  return (
        <Card>
          <Card.Header>
            <Row className="text-center">
              <Col>
                <b className="mr-2">{`${props.service.service} - ${props.service.plan}`}</b>
                {props.service.medium === "CO" ? (
                  <Badge variant="primary">{props.service.medium}</Badge>
                ) : (
                  <Badge variant="warning">{props.service.medium}</Badge>
                )}
              </Col>
              <Col>
                <b>PM:</b> {props.service.pm}
              </Col>
              <Col>
                <b>IM:</b> {props.service.im}
              </Col>
              <Col>
                <b>Status:</b> <Badge variant="success">{props.service.status}</Badge>
              </Col>
              <Col>
                <EditServiceModal
                  action="Edit"
                  hardware={props.hardware}
                  abonado={props.abonado}
                  reload={props.reload}
                  service={props.service}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title> Datos </Card.Title>

                <MyInputGroup
                  prepend="Servicio"
                  name="service"
                  value={props.service.service}
                >
                  <Form.Control
                    type="text"
                    name="service"
                    value={`${props.service.plan} Mbps`}
                    onChange={() => console.log("toma")}
                  />
                </MyInputGroup>

                <MyInputGroup
                  prepend="Tecnología"
                  name="medium"
                  value={props.service.medium}
                />

                <MyInputGroup
                  prepend="Equipo"
                  name="device"
                  value={props.service.device}
                />

                <MyInputGroup
                  prepend="Interfaz"
                  name="interface"
                  value={props.service.interface}
                />
              </Col>
              <Col>
                <Card.Title> Direccionamiento </Card.Title>

                <MyInputGroup prepend="Red" name="red" value={props.service.red} />

                <MyInputGroup prepend="IP" name="ip" value={props.service.ip} />

                <MyInputGroup prepend="DG" name="dg" value={props.service.dg} />

                <MyInputGroup prepend="Mask" name="mask" value={props.service.mask} />

                <MyInputGroup prepend="VLAN" name="vlan" value={props.service.vlan} />
              </Col>
              <Col>
                <Card.Title> Monitoria </Card.Title>
                <MyInputGroup
                  prepend="IP"
                  name="ip_mon"
                  value={props.service.ip_mon}
                />

                <MyInputGroup
                  prepend="DG"
                  name="dg_mon"
                  value={props.service.dg_mon}
                />
                <MyInputGroup
                  prepend="Mask"
                  name="mask_mon"
                  value={props.service.mask_mon}
                />
                <MyInputGroup
                  prepend="VLAN"
                  name="vlan_mon"
                  value={props.service.vlan_mon}
                />
              </Col>
              <Col>
                <Card.Title>Patcheo</Card.Title>

                <MyInputGroup prepend="HUB" name="hub" value={props.service.hub}>
                  <Form.Control
                    type="text"
                    name="obra"
                    value={props.service.obra}
                    onChange={() => console.log("toma")}
                  />
                </MyInputGroup>
                <MyInputGroup
                  prepend="Patcheo"
                  name="rack"
                  value={props.service.rack}
                >
                  <Form.Control
                    type="text"
                    name="patchera"
                    value={props.service.patchera}
                    onChange={() => console.log("toma")}
                  />
                  <Form.Control
                    type="text"
                    name="position"
                    value={props.service.position}
                    onChange={() => console.log("toma")}
                  />
                </MyInputGroup>

                <MyInputGroup
                  prepend="Switch"
                  name="nexus"
                  value={props.service.nexus}
                >
                  <Form.Control
                    type="text"
                    name="nexus_port"
                    value={props.service.nexus_port}
                    onChange={() => console.log("toma")}
                  />
                </MyInputGroup>

                <MyInputGroup
                  prepend="Dist"
                  name="dist"
                  value={props.service.dist ? `${props.service.dist} mts` : ""}
                >
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <b>Att</b>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    name="att"
                    value={props.service.att ? `${props.service.att} dB` : ""}
                    onChange={() => console.log("toma")}
                  />
                </MyInputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
  );
}

export default AdiFo;
