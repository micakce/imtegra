import React, { Component } from 'react';
import { Button, Form, Col, Tabs, Tab } from 'react-bootstrap';
import { serviceBlankState } from './testVariables';

const ServicioCM = (props) => (

  <React.Fragment>
    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>{props.modifier ? props.modifier.plan : 'Velocidad'}</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.plan}
          name="plan"
          onChange={props.handleChange}
          type="string"
          placeholder={props.modifier ? props.modifier.placeholder : 'en Mbps'}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>VLAN</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.vlan}
          name="vlan"
          onChange={props.handleChange}
          type="text"
          placeholder="VLAN del Servicio"
        />
      </Form.Group>
    </Form.Row>

    {props.children}

    <Form.Row>
      <Form.Group md={3} as={Col} controlId="">
        <Form.Label>HUB</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.hub}
          name="hub"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group md={4} as={Col} controlId="">
        <Form.Label>CMTS</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.cmts}
          name="cmts"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group>
      <Form.Group md={5} as={Col} controlId="">
        <Form.Label>MAC</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.mac}
          name="mac"
          onChange={props.handleChange}
          placeholder="0000.0055.5555"
        />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>IM</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.im}
          name="im"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group><Form.Group as={Col} controlId="">
        <Form.Label>PM</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.pm}
          name="pm"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group><Form.Group as={Col} controlId="">
        <Form.Label>Status</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.status}
          name="status"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group>
    </Form.Row>

  </React.Fragment>
)

const ServicioFO = props => (
  <React.Fragment>
    <br></br>

    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>{props.modifier ? props.modifier.plan : 'Velocidad'}</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.plan}
          name="plan"
          onChange={props.handleChange}
          type="text"
          placeholder={props.modifier ? props.modifier.placeholder : 'en Mbps'}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>HUB</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.hub}
          name="hub"
          onChange={props.handleChange}
          placeholder="HUB" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>Obra</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.obra}
          name="obra"
          onChange={props.handleChange}
          placeholder="XXFO" >
        </Form.Control>
      </Form.Group>
    </Form.Row>

    {props.children}

    {props.state.service === 'L3VPN' ?
      <Form.Row>
        <Form.Group as={Col} md={4} controlId="">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            size="sm"
            value={props.state.mode}
            name="mode"
            onChange={props.handleChange}
            as="select"
            placeholder="en Mbps">
            <option>...</option>
            <option>Punto a punto</option>
            <option>Punto Multipunto</option>
            <option>Multipunto</option>
          </Form.Control>
        </Form.Group>
        {props.state.mode === 'Punto Multipunto'
          ?
            (<><Form.Group as={Col} md={2} controlId="">
              <Form.Label>Hub</Form.Label>
              <Form.Control size="sm" value={props.state.sites.hub} name="sites.hub" onChange={props.handleChange} type="text" placeholder="5551212,5559012"
              />
            </Form.Group>
              <Form.Group as={Col} md={4} controlId="">
                <Form.Label>Spokes</Form.Label>
                <Form.Control size="sm" value={props.state.sites.spokes} name="sites.spokes" onChange={props.handleChange} type="text" placeholder="5551212,5559012"
                />
              </Form.Group></>)
              :
                <Form.Group as={Col} controlId="">
                  <Form.Label>Contra</Form.Label>
                  <Form.Control size="sm" value={props.state.sites.spokes} name="sites.spokes" onChange={props.handleChange} type="text" placeholder="5551212,5559012"
                  />
                </Form.Group>
        }
        <Form.Group as={Col} md={2} controlId="">
          <Form.Label>VLAN</Form.Label>
          <Form.Control
            size="sm"
            value={props.state.vlan}
            name="vlan"
            onChange={props.handleChange}
            type="text"
            placeholder=""
          />
        </Form.Group>
      </Form.Row> :
      <Form.Row>
        <Form.Group as={Col} controlId="">
          <Form.Label>Equipo</Form.Label>
          <Form.Control
            size="sm"
            value={props.state.device}
            name="device"
            onChange={props.handleChange}
            as="select"
            placeholder="" >
            <option>...</option>
            {props.hardware.length > 0
              ? props.hardware.map(device => <option>{device.device} {device.model}</option>)
              : <option>No hay equipos asociados </option>}
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>Interfaz</Form.Label>
          <Form.Control
            size="sm"
            value={props.state.interface}
            name="interface"
            onChange={props.handleChange}
            type="text"
            placeholder="Gi1"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="">
          <Form.Label>VLAN</Form.Label>
          <Form.Control
            size="sm"
            value={props.state.vlan}
            name="vlan"
            onChange={props.handleChange}
            type="text"
            placeholder="VLAN del Servicio"
          />
        </Form.Group>
      </Form.Row>

    }


    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>IM</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.im}
          name="im"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group><Form.Group as={Col} controlId="">
        <Form.Label>PM</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.pm}
          name="pm"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group><Form.Group as={Col} controlId="">
        <Form.Label>Status</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.status}
          name="status"
          onChange={props.handleChange}
          placeholder=""
        />
      </Form.Group>
    </Form.Row>

  </React.Fragment>
)

const DireccionamientoFO = (props) => (
  <>
    <br></br>
    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>Red Wan</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.red}
          name="red"
          onChange={props.handleChange}
          type="text"
          placeholder="10.0.0.0/30"
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>Mascara</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.mask}
          name="mask"
          onChange={props.handleChange}
          type="text"
          placeholder="255.255.255.0"
        />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>Wan IP</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.ip}
          name="ip"
          onChange={props.handleChange}
          type="text"
          placeholder=""
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>Wan DG</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.dg}
          name="dg"
          onChange={props.handleChange}
          type="text"
          placeholder="IP del PE"
        />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="">
        <Form.Label>IP Monitoria</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.ip_mon}
          name="ip_mon"
          onChange={props.handleChange}
          type="text"
          placeholder="IP equipo cliente"
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>DG Monitoria</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.dg_mon}
          name="dg_mon"
          onChange={props.handleChange}
          type="text"
          placeholder="IP del PE"
        />
      </Form.Group>
      <Form.Group as={Col} controlId="">
        <Form.Label>Máscara</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.mask_mon}
          name="mask_mon"
          onChange={props.handleChange}
          type="text"
          placeholder="IP del PE"
        />
      </Form.Group>
    </Form.Row>
  </>
)

const Patcheo = (props) => (
  <>
    <br></br>
    <Form.Row>
      <Form.Group as={Col} >
        <Form.Label>Rack</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.rack}
          name="rack"
          onChange={props.handleChange}
          placeholder="Rack/FDF" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} >
        <Form.Label>Patchera</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.patchera}
          name="patchera"
          onChange={props.handleChange}
          placeholder="Patchera" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} >
        <Form.Label>Posición</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.position}
          name="position"
          onChange={props.handleChange}
          placeholder="Posicion" >
        </Form.Control>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} >
        <Form.Label>Distancia</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.dist}
          name="dist"
          onChange={props.handleChange}
          placeholder="en mts" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} >
        <Form.Label>Att</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.att}
          name="att"
          onChange={props.handleChange}
          placeholder="en dB" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} >
        <Form.Label>Switch</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.nexus}
          name="nexus"
          onChange={props.handleChange}
          placeholder="Switch en HUB" >
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} >
        <Form.Label>Puerto</Form.Label>
        <Form.Control
          size="sm"
          value={props.state.nexus_port}
          name="nexus_port"
          onChange={props.handleChange}
          placeholder="Numero de puerto" >
        </Form.Control>
      </Form.Group>
    </Form.Row>
  </>
)


class AddService extends Component {

  constructor(props) {
    super(props);
    if (props.action === "Edit") {
      this.state = props.service;
    } else {
      this.state = serviceBlankState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.addService = this.addService.bind(this);
  }

  handleChange(e) {
    const { name, value, id } = e.target;

    if (name === 'mediumRadios') {
      this.setState({ medium: id });
    } else if (name.match(/\./)) {
      const name_key = name.match(/(\D+)\./)[1];
      const name_value = name.match(/\.(\D+)/)[1];
      this.setState({ [name_key]: { ...this.state[name_key], [name_value]: value } });
    } else if (name === 'red') {
      if (value.match(/^\d{1,3}(\.\d{1,3}){3}\/\d{2}$/)) {
        console.log('It matches');
        var oct123 = value.match(/^\d{1,3}(\.\d{1,3}){2}/)[0];
        var oct4 = parseInt(value.match(/(\d{1,3})\//)[1]);
        var service_ip = oct123 + '.' + (oct4 + 1).toString();
        var service_dg = oct123 + '.' + (oct4 + 2).toString();
        this.setState({
          red: value,
          ip: service_ip,
          dg: service_dg,
          mask: '255.255.255.252'
        });
      } else {
        this.setState({
          [name]: value
        });
      }
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
        .then((res) => {
          console.log(res.json());
          this.props.toggle();
          this.props.reload();
        })
        .then(data => console.log(data))
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
          <Tabs defaultActiveKey="service" >

            <Tab eventKey="service" title="Service" >
              <ServicioFO state={this.state} hardware={this.props.hardware} handleChange={this.handleChange} />
            </Tab>

            <Tab eventKey="direccionamiento" title="Direccionamiento" >
              <DireccionamientoFO state={this.state} handleChange={this.handleChange}
              />
            </Tab>

            <Tab eventKey="patcheo" title="Patcheo" >
              <Patcheo state={this.state} handleChange={this.handleChange} />
            </Tab>

          </Tabs>

        )
      } else if (this.state.medium === "CO") {
        return (
          <ServicioCM state={this.state} handleChange={this.handleChange}>

            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Red</Form.Label>
                <Form.Control size="sm"
                  value={this.state.red}
                  name="red"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="10.0.0.0/30"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="">
                <Form.Label>Mascara Servicio</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.mask}
                  name="mask"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="255.255.255.0"
                />
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
                  placeholder="IP del cliente"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>DG Servicio</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.dg}
                  name="dg"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="IP del PE"
                />
              </Form.Group>
            </Form.Row>

          </ServicioCM>

        )
      }
    }
  }

  l2vpn() {
    if (this.state.service === 'L2VPN') {
      if (this.state.medium === "FO") {
        return (

          <Tabs defaultActiveKey="service" >

            <Tab eventKey="service" title="Service" >
              <ServicioFO state={this.state} hardware={this.props.hardware} handleChange={this.handleChange}>
                <Form.Row>
                  <Form.Group as={Col} md={4} controlId="">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control size="sm" value={this.state.mode} name="mode" onChange={this.handleChange} as="select" placeholder="en Mbps">
                      <option>...</option>
                      <option>Punto a punto</option>
                      <option>Punto Multipunto</option>
                      <option>Multipunto</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.mode === 'Punto Multipunto'
                    ?
                      (<><Form.Group as={Col} md={3} controlId="">
                        <Form.Label>Concentrador</Form.Label>
                        <Form.Control size="sm" value={this.state.sites.hub} name="sites.hub" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                        />
                      </Form.Group>
                        <Form.Group as={Col} md={5} controlId="">
                          <Form.Label>Spokes</Form.Label>
                          <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                          />
                        </Form.Group></>)
                        :
                          <Form.Group as={Col} controlId="">
                            <Form.Label>Contra</Form.Label>
                            <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                            />
                          </Form.Group>
                  }
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>IP Monitoria</Form.Label>
                    <Form.Control size="sm" value={this.state.ip_mon} name="ip_mon" onChange={this.handleChange} type="text" placeholder="IP equipo cliente"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>Mascara</Form.Label>
                    <Form.Control size="sm" value={this.state.mask_mon} name="mask_mon" onChange={this.handleChange} type="text" placeholder="255.255.255.240"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>DG</Form.Label>
                    <Form.Control size="sm" value={this.state.dg_mon} name="dg_mon" onChange={this.handleChange} type="text" placeholder="IP del PE"
                    />
                  </Form.Group>
                </Form.Row>

              </ServicioFO>
            </Tab>

            <Tab eventKey="patcheo" title="Patcheo" >
              <Patcheo state={this.state} handleChange={this.handleChange} />
            </Tab>

          </Tabs >
        )
      } else if (this.state.medium === "CO") {

        return (
          <ServicioCM state={this.state} handleChange={this.handleChange}>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.mode}
                  name="mode"
                  onChange={this.handleChange}
                  as="select"
                  placeholder="en Mbps">
                  <option>...</option>
                  <option>Punto a punto</option>
                  <option>Punto Multipunto</option>
                  <option>Multipunto</option>
                </Form.Control>
              </Form.Group>
              {this.state.mode === 'Punto Multipunto'
                ?
                  (<><Form.Group as={Col} md={3} controlId="">
                    <Form.Label>Concentrador</Form.Label>
                    <Form.Control size="sm" value={this.state.sites.hub} name="sites.hub" onChange={this.handleChange} type="text" placeholder="5559012"
                    />
                  </Form.Group>
                    <Form.Group as={Col} md={5} controlId="">
                      <Form.Label>Spokes</Form.Label>
                      <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                      />
                    </Form.Group></>)
                    :
                      <Form.Group as={Col} controlId="">
                        <Form.Label>Contra</Form.Label>
                        <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                        />
                      </Form.Group>
              }
            </Form.Row>

          </ServicioCM>
        )
      }
    }
  }

  l3vpn() {
    if (this.state.service === 'L3VPN') {
      if (this.state.medium === "FO") {
        return (

          <Tabs defaultActiveKey="service" >

            <Tab eventKey="service" title="Service">

              <ServicioFO state={this.state} hardware={this.props.hardware} handleChange={this.handleChange}>
              </ServicioFO>

            </Tab>


            <Tab eventKey="capa2" title="Capa 2" >
              <br></br>

              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Equipo</Form.Label>
                  <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} as="select" placeholder="" >
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
                    value={this.state.interface}
                    name="interface"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Gi1"
                  />
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
                    placeholder="IP equipo cliente"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Mascara</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.mask_mon}
                    name="mask_mon"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="255.255.255.240"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>DG</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.dg_mon}
                    name="dg_mon"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="IP del PE"
                  />
                </Form.Group>
              </Form.Row>
            </Tab>

            <Tab eventKey="capa3" title="Capa 3" >
              <br></br>

              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Red Wan</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.red}
                    name="red"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="10.0.0.0/30"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Wan IP</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.ip}
                    name="ip"
                    onChange={this.handleChange}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Wan DG</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.dg}
                    name="dg"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="IP del PE"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Mascara</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.mask}
                    name="mask"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="255.255.255.0"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Red Lan</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.lan_red}
                    name="lan_red"
                    onChange={this.handleChange}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Lan IP</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.lan_ip}
                    name="lan_ip"
                    onChange={this.handleChange}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Lan DG</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.lan_dg}
                    name="lan_dg"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="IP del PE"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Mascara</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.lan_mask}
                    name="lan_mask"
                    onChange={this.handleChange}
                    type="text"
                    placeholder=""
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Equipo</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.device_router}
                    name="device_router"
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
                    value={this.state.interface_router}
                    name="interface_router"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Gi0/?"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="">
                  <Form.Label>IP Monitoria</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.ip_mon_router}
                    name="ip_mon_router"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="IP equipo cliente"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>Mascara</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.mask_mon}
                    name="mask_mon"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="255.255.255.240"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="">
                  <Form.Label>DG</Form.Label>
                  <Form.Control
                    size="sm"
                    value={this.state.dg_mon}
                    name="dg_mon"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="IP del PE"
                  />
                </Form.Group>
              </Form.Row>

            </Tab>
            <Tab eventKey="patcheo" title="Patcheo" >
              <Patcheo state={this.state} handleChange={this.handleChange} />
            </Tab>
          </Tabs >
        )
      } else if (this.state.medium === "CO") {

        return (
          <ServicioCM state={this.state} handleChange={this.handleChange}>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.mode}
                  name="mode"
                  onChange={this.handleChange}
                  as="select"
                  placeholder="en Mbps">
                  <option>...</option>
                  <option>Punto a punto</option>
                  <option>Punto Multipunto</option>
                  <option>Multipunto</option>
                </Form.Control>
              </Form.Group>
              {this.state.mode === 'Punto Multipunto'
                ?
                  (<><Form.Group as={Col} md={3} controlId="">
                    <Form.Label>Concentrador</Form.Label>
                    <Form.Control size="sm" value={this.state.sites.hub} name="sites.hub" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                    />
                  </Form.Group>
                    <Form.Group as={Col} md={5} controlId="">
                      <Form.Label>Spokes</Form.Label>
                      <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                      />
                    </Form.Group></>)
                    :
                      <Form.Group as={Col} controlId="">
                        <Form.Label>Contra</Form.Label>
                        <Form.Control size="sm" value={this.state.sites.spokes} name="sites.spokes" onChange={this.handleChange} type="text" placeholder="5551212,5559012"
                        />
                      </Form.Group>
              }
            </Form.Row>

          </ServicioCM>
        )
      }
    }
  }

  ttt() {
    if (this.state.service === 'TTT') {
      if (this.state.medium === "FO") {
        return (
          <Tabs defaultActiveKey="service" >
            <Tab eventKey="service" title="Service" >
              <br></br>

              <ServicioFO state={this.state} modifier={{ plan: 'Plan', placeholder: 'Canales/Numeros' }} hardware={this.props.hardware} handleChange={this.handleChange}>
                <Form.Row>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>Cabecera</Form.Label>
                    <Form.Control
                      size="sm"
                      value={this.state.nhead}
                      name="nhead"
                      onChange={this.handleChange}
                      type="string"
                      placeholder="1er numero"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>Cola</Form.Label>
                    <Form.Control
                      size="sm"
                      value={this.state.ntale}
                      name="ntale"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Ultimo numero"
                    />
                  </Form.Group>
                </Form.Row>

              </ServicioFO >
            </Tab>

            <Tab eventKey="direccionamiento" title="Direccionamiento" >
              <DireccionamientoFO state={this.state} handleChange={this.handleChange}
              />
            </Tab>

            <Tab eventKey="patcheo" title="Patcheo" >
              <Patcheo state={this.state} handleChange={this.handleChange}
              />
            </Tab>

          </Tabs>
        )
      } else if (this.state.medium === "CO") {

        return (
          <ServicioCM state={this.state} handleChange={this.handleChange} modifier={{ plan: 'Plan', placeholder: 'Canales/Numeros' }}>
            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Cabecera</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.nhead}
                  name="nhead"
                  onChange={this.handleChange}
                  type="string"
                  placeholder="1er numero"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Cola</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.ntale}
                  name="ntale"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Ultimo numero"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>Red</Form.Label>
                <Form.Control size="sm"
                  value={this.state.red || "172.31."}
                  name="red"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="172.31.xx.xx/30"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Mascara</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.mask}
                  name="mask"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="255.255.255.0"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="">
                <Form.Label>IP PBX</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.ip}
                  name="ip"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="IP de central"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>DG</Form.Label>
                <Form.Control
                  size="sm"
                  value={this.state.dg}
                  name="dg"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="IP del PE"
                />
              </Form.Group>
            </Form.Row>
          </ServicioCM>

        )
      }
    }
  }

  render() {
    return (
      <Form onSubmit={this.addService}>
        <Form.Row className="text-center">
          <Form.Group as={Col} controlId="formGridState" >
            <Form.Label>Servicio</Form.Label>
            <Form.Control size="sm" name="service" value={this.state.service} onChange={this.handleChange} as="select" required >
              <option>Selecciona un servicio</option>
              <option>ADI</option>
              <option>L2VPN</option>
              <option>L3VPN</option>
              <option>TTT</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} >
            <Form.Label >
              Medio
            </Form.Label>
            <div className="d-flex justify-content-around" >
              <Form.Check
                type="radio"
                label="CO"
                name="mediumRadios"
                id="CO"
                onChange={this.handleChange}
                checked={this.state.medium === 'CO' ? true : false}
                required
              />
              <Form.Check
                type="radio"
                label="FO"
                name="mediumRadios"
                id="FO"
                onChange={this.handleChange}
                checked={this.state.medium === 'FO' ? true : false}
                required
              />
            </div>
          </Form.Group>
        </Form.Row>
        {this.adi()}
        {this.l2vpn()}
        {this.l3vpn()}
        {this.ttt()}
        <Button variant="warning" type="submit" >
          Save
        </Button>
        {' '}
        <Button variant="secondary" onClick={() => this.props.toggle(false)}  >
          Cancel
        </Button>
      </Form>
    )
  }
}

export default AddService;
