import React, { Component } from 'react';
import { Form, Col, Row } from 'react-bootstrap';


export default class AddService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value, id } = e.target;

        if (name === 'mediumRadios') {
            (id === "CO") ? this.setState({ co: true, fo: false }) : this.setState({ co: false, fo: true })
        } else {
            this.setState({
                [name]: value
            });
        }
    }

    adi() {
        if (this.state.service === 'ADI') {
            if (this.state.fo) {
                return (
                    <div>
                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Red</Form.Label>
                                <Form.Control size="sm" value={this.state.red} name="red" onChange={this.handleChange} type="text" placeholder="10.0.0.0/30" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control size="sm" value={this.state.speed} name="speed" onChange={this.handleChange} type="number" placeholder="en Mbps" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.ip} name="ip" onChange={this.handleChange} type="text" placeholder="IP del cliente" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>IP Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.ip_mon} name="ip_mon" onChange={this.handleChange} type="text" placeholder="IP equipo cliente" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.red} name="dg" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>DG Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.dg_mon} name="dg_mon" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Servicio</Form.Label>
                                <Form.Control size="sm" value={this.state.mask} name="mask" onChange={this.handleChange} type="text" placeholder="255.255.255.0" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Mascara Monitoria</Form.Label>
                                <Form.Control size="sm" value={this.state.mask_mon} name="mask_mon" onChange={this.handleChange} type="text" placeholder="255.255.255.240" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan} name="vlan" onChange={this.handleChange} type="text" placeholder="VLAN del Servicio" />
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
                                    <option>Selecciona un equipo</option>
                                    <option>SG350</option>
                                    <option>DELL</option>
                                    <option>CM</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>VLAN</Form.Label>
                                <Form.Control size="sm" value={this.state.vlan_mon} name="vlan_mon" onChange={this.handleChange} type="text" placeholder="VLAN 152" />
                            </Form.Group>
                        </Form.Row>
                    </div>

                )
            } else if (this.state.co) {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Velocidad</Form.Label>
                                <Form.Control size="sm" value={this.state.speed} name="speed" onChange={this.handleChange} type="number" placeholder="en Mbps" />
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
                                <Form.Control size="sm" value={this.state.red} name="dg" onChange={this.handleChange} type="text" placeholder="IP del PE" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Equipo</Form.Label>
                                <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
                                    <option>Selecciona un equipo</option>
                                    <option>SG350</option>
                                    <option>DELL</option>
                                    <option>CM</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </div>

                )
            }
        }
    }


    l2vpn() {
        if (this.state.service === 'L2VPN') {
            if (this.state.fo) {
                return (
                    <div>

                        <Form.Row>
                            <Form.Group as={Col} controlId="">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control size="sm" value={this.state.type} name="type" onChange={this.handleChange} as="select" placeholder="en Mbps">
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
                                <Form.Control size="sm" value={this.state.speed} name="speed" onChange={this.handleChange} type="number" placeholder="en Mbps" />
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
                                    <option>Selecciona un equipo</option>
                                    <option>SG350</option>
                                    <option>DELL</option>
                                    <option>CM</option>
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
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridState" md={6} >
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

                    <Form.Group as={Col} md={3} >
                        <Form.Label >
                            Medio
                        </Form.Label>
                        <div style={{ display: "flex", justifyContent: "space-between" }} >
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
                    {this.adi()}
                    {this.l2vpn()}
                </Form.Row>
            </Form >
        )
    }
}