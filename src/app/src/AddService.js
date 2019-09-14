import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';


class AddService extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        if (props.action === "Edit") {
            this.state = props.service;
        } else {
            this.state = { service: "" };
        }
        this.handleChange = this.handleChange.bind(this);
        this.addService = this.addService.bind(this);
    }

    handleChange(e) {
        console.log(this.props)
        const { name, value, id } = e.target;
        if (name === 'mediumRadios') {
            this.setState({ medium: id });
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    addService(e) {
        if (this.props.action === 'Edit') {
            const idx = this.props.idx;
            fetch(`/clients/service/edit/${this.props.abonado}`, {
                method: 'PUT',
                body: JSON.stringify({ ...this.state, idx }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.props.toggle();
                    this.props.reload();
                })
            e.preventDefault();

        } else {

            fetch(`/clients/service/${this.props.abonado}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.props.toggle();
                    this.props.reload();
                })
            e.preventDefault();
        }
    }

    adi() {
        if (this.state.service === 'ADI') {
            if (this.state.medium === "FO") {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.plan}
                                    name="plan"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="en Mbps" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.vlan}
                                    name="vlan"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Red</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.red}
                                    name="red"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="10.0.0.0/30" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Servicio</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.mask}
                                    name="mask"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="255.255.255.0" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Servicio</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.ip}
                                    name="ip"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="IP del cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Servicio</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.dg}
                                    name="dg"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Monitoria</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.ip_mon}
                                    name="ip_mon"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="IP equipo cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Monitoria</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.dg_mon}
                                    name="dg_mon"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.device}
                                    name="device"
                                    onChange={this.handleChange}
                                    as="select"
                                    placeholder="" >
                                    <option>...</option>
                                    {this.props.hardware.length > 0
                                        ? this.props.hardware.map(device => <option>{device.device} {device.model}</option>)
                                        : <option>No hay equipos asociados </option>}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Interfaz</Form.Label>
                                <Form.Control
                                    size="sm"
                                    value={this.state.interfaz}
                                    name="interfaz"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="Gi1" />
                            </Form.Group>
                        </Form.Row>
                    </div>

                )
            } else if (this.state.medium === "CO") {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control size="sm" value={this.state.plan} name="plan" onChange={this.handleChange} type="number" placeholder="en Mbps" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Red</Form.Label>
                                <Form.Control size="sm" value={this.state.red} name="red" onChange={this.handleChange} type="text" placeholder="10.0.0.0/30" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.mask} name="mask" onChange={this.handleChange} type="text" placeholder="255.255.255.0" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.ip} name="ip" onChange={this.handleChange} type="text" placeholder="IP del cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.dg} name="dg" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group md={3} as={Col} controlId="">
                                <Form.Label>HUB</Form.Label>
                                <Form.Control size="sm" value={this.state.hub} name="hub" onChange={this.handleChange} placeholder="Modelo de CM" />
                            </Form.Group>
                            <Form.Group md={4} as={Col} controlId="">
                                <Form.Label>CMTS</Form.Label>
                                <Form.Control size="sm" value={this.state.cmts} name="cmts" onChange={this.handleChange} placeholder="0000.0055.5555" />
                            </Form.Group>
                            <Form.Group md={5} as={Col} controlId="">
                                <Form.Label>MAC</Form.Label>
                                <Form.Control size="sm" value={this.state.mac} name="mac" onChange={this.handleChange} placeholder="0000.0055.5555" />
                            </Form.Group>
                        </Form.Row>
                    </div>

                )
            }
        }
    }


    l2vpn() {
        if (this.state.service === 'L2VPN') {
            if (this.state.medium === "FO") {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control size="sm" value={this.state.mode} name="mode" onChange={this.handleChange} as="select" placeholder="en Mbps">
                                    <option>...</option>
                                    <option>Punto a punto</option>
                                    <option>Punto Multipunto</option>
                                    <option>Multipunto</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Contra</Form.Label>
                                <Form.Control size="sm" value={this.state.sites} name="sites" onChange={this.handleChange} type="text" placeholder="5551212,5559012" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control size="sm" value={this.state.plan} name="plan" onChange={this.handleChange} type="number" placeholder="en Mbps" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.ip_mon} name="ip_mon" onChange={this.handleChange} type="text" placeholder="IP equipo cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.mask_mon} name="mask_mon" onChange={this.handleChange} type="text" placeholder="255.255.255.240" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.dg_mon} name="dg_mon" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan_mon} name="vlan_mon" onChange={this.handleChange} type="text" placeholder="VLAN 152" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
                                    {this.props.hardware.length > 0
                                        ? this.props.hardware.map(device => <option>{device.device} {device.model}</option>)
                                        : <option>No hay equipos asociados </option>}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </div>
                )
            } else if (this.state.medium === "CO") {

                return (

                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control size="sm" value={this.state.mode} name="mode" onChange={this.handleChange} as="select" placeholder="en Mbps">
                                    <option>...</option>
                                    <option>Punto a punto</option>
                                    <option>Punto Multipunto</option>
                                    <option>Multipunto</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Contra</Form.Label>
                                <Form.Control size="sm" value={this.state.contra} name="contra" onChange={this.handleChange} type="text" placeholder="5551212,5559012" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control size="sm" value={this.state.plan} name="plan" onChange={this.handleChange} type="number" placeholder="en Mbps" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
                                    {this.props.hardware.length > 0
                                        ? this.props.hardware.map(device => <option>{device.device} {device.model}</option>)
                                        : <option>No hay equipos asociados </option>}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </div>
                )
            }
        }
    }

    ttt() {
        if (this.state.service === 'TTT') {
            if (this.state.medium === "FO") {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Plan</Form.Label>
                                <Form.Control size="sm" value={this.state.plan} name="plan" onChange={this.handleChange} type="text" placeholder="canales/números" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Red</Form.Label>
                                <Form.Control size="sm" value={this.state.red} name="red" onChange={this.handleChange} type="text" placeholder="10.0.0.0/30" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.mask} name="mask" onChange={this.handleChange} type="text" placeholder="255.255.255.0" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.ip} name="ip" onChange={this.handleChange} type="text" placeholder="IP del cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.dg} name="dg" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.ip_mon} name="ip_mon" onChange={this.handleChange} type="text" placeholder="IP equipo cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.mask_mon} name="mask_mon" onChange={this.handleChange} type="text" placeholder="255.255.255.240" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.dg_mon} name="dg_mon" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan_mon} name="vlan_mon" onChange={this.handleChange} type="text" placeholder="VLAN 152" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
                                    {this.props.hardware.length > 0
                                        ? this.props.hardware.map(device => <option>{device.device} {device.model}</option>)
                                        : <option>No hay equipos asociados </option>}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </div >
                )
            } else if (this.state.medium === "CO") {

                return (

                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Plan</Form.Label>
                                <Form.Control size="sm" value={this.state.plan} name="plan" onChange={this.handleChange} type="number" placeholder="canales/números" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Red</Form.Label>
                                <Form.Control size="sm" value={this.state.red} name="red" onChange={this.handleChange} type="text" placeholder="10.0.0.0/30" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.mask} name="mask" onChange={this.handleChange} type="text" placeholder="255.255.255.0" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.ip} name="ip" onChange={this.handleChange} type="text" placeholder="IP del cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.dg} name="dg" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
                                    {this.props.hardware.length > 0
                                        ? this.props.hardware.map(device => <option>{device.device} {device.model}</option>)
                                        : <option>No hay equipos asociados </option>}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                    </div>
                )
            }
        }
    }

    render() {
        return (
            <Form>
                <Form.Row className="text-center">
                    <Form.Group as={Col} controlId="formGridState" >
                        <Form.Label>Servicio</Form.Label>
                        <Form.Control size="sm" name="service" value={this.state.service} onChange={this.handleChange} as="select" >
                            <option>Selecciona un servicio</option>
                            <option>ADI</option>
                            <option>L2VPN</option>
                            <option>L3VPN</option>
                            <option>TTT</option>
                            <option>Agregar</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label >
                            Medio
                        </Form.Label>
                        <div style={{ display: "flex", justifyContent: "space-around" }} >
                            <Form.Check
                                type="radio"
                                label="CO"
                                name="mediumRadios"
                                id="CO"
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="FO"
                                name="mediumRadios"
                                id="FO"
                                onChange={this.handleChange}
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                {this.adi()}
                {this.l2vpn()}
                {this.ttt()}
                <Button variant="warning" type="submit" onClick={this.addService}>
                    Save
                </Button>
            </Form >
        )
    }
}

export default AddService;