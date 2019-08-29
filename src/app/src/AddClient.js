import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { dangeloState, blankState } from './testVariables'

export default class AddClient extends Component {

  constructor(props) {
    super(props);
    if (props.client) {
      this.state = props.client;
    } else {
      this.state = blankState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.addClient = this.addClient.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name.match(/\./)) {
      const name_key = name.match(/(\D+)\./)[1];
      const name_value = name.match(/\.(\D+)/)[1];
      if (name_key === 'address') {
        this.setState({ [name_key]: { ...this.state[name_key], [name_value]: value } });
        console.log(name_key, name_value, this.state[name_key])
      } else if (name_key === 'services') {
        if (this.state.services && this.state.services.length < 2) {
          this.setState({
            [name_key]: [{ ...this.state.services[0], [name_value]: value }]
          })
        } else {
          console.log("Only allowed to edit one service over here")
        }
      }
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  addClient(e) {
    if (this.props.action === 'edit') {
      fetch(`/clients/${this.props.client._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            abonado: "",
            name: "",
            telefono: "",
            email: "",
            address: {
              street: "",
              apto: "",
              location: "",
              city: ""
            },
            services: [
              {
                name: "",
                speed: ""
              }
            ],
            pm: "",
            im: "",
            status: ""
          });
          this.props.toggle();
          this.props.reload();
        })
        .catch(err => console.error(err));
      e.preventDefault();

    } else if (this.props.action === 'add') {
      fetch('/clients', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res.json())
          this.props.toggle();
          this.props.reload();
        })
        .catch(err => console.error(err));
      e.preventDefault();
    } else {
      fetch('/clients', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            abonado: "",
            name: "",
            telefono: "",
            email: "",
            address: {
              street: "",
              apto: "",
              location: "",
              city: ""
            },
            services: [
              {
                name: "",
                speed: ""
              }
            ]
          });
        })
        .catch(err => console.error(err));
      e.preventDefault();

    }
  }

  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group md="3" as={Col} controlId="">
            <Form.Label>Abonado</Form.Label>
            <Form.Control value={this.state.abonado} name="abonado" onChange={this.handleChange} type="number" placeholder="5555555" />
          </Form.Group>

          <Form.Group md as={Col} controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={this.state.name} name="name" onChange={this.handleChange} type="text" placeholder="Telecentro SA" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md as={Col} controlId="">
            <Form.Label>Telefono</Form.Label>
            <Form.Control value={this.state.telefono} name="telefono" onChange={this.handleChange} type="text" placeholder="(011) 6380-9500" />
          </Form.Group>

          <Form.Group md as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={this.state.email} name="email" onChange={this.handleChange} type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="">
            <Form.Label>Calle</Form.Label>
            <Form.Control value={this.state.address.street} name="address.street" onChange={this.handleChange} type="text" placeholder="Av. Congreso 2440" />
          </Form.Group>

          <Form.Group md="4" as={Col} controlId="">
            <Form.Label>Piso/Apto</Form.Label>
            <Form.Control value={this.state.address.apto} name="address.apto" onChange={this.handleChange} type="text" placeholder="P6 D1" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md="6" as={Col} controlId="formGridaddress1">
            <Form.Label>Localidad</Form.Label>
            <Form.Control value={this.state.address.location} name="address.location" onChange={this.handleChange} placeholder="Belgrano" />
          </Form.Group>

          <Form.Group md="6" as={Col} controlId="formGridaddress2">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control value={this.state.address.city} name="address.city" onChange={this.handleChange} placeholder="CABA" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>PM</Form.Label>
            <Form.Control value={this.state.pm} name="pm" onChange={this.handleChange} placeholder="" />
          </Form.Group>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>Implementador</Form.Label>
            <Form.Control value={this.state.im} name="im" onChange={this.handleChange} placeholder="" />
          </Form.Group>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>Estatus</Form.Label>
            <Form.Control value={this.state.status} name="status" onChange={this.handleChange} placeholder="" />
          </Form.Group>
        </Form.Row>
        {/* <Form.Row>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>Service</Form.Label>
            <Form.Control value={this.state.services[0].name} name="services.name" onChange={this.handleChange} placeholder="" />
          </Form.Group>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>Speed</Form.Label>
            <Form.Control value={this.state.services[0].speed} name="services.speed" onChange={this.handleChange} placeholder="" />
          </Form.Group>
        </Form.Row> */}
        <Button onClick={this.addClient} variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="secondary" onClick={this.props.toggle}>
          Cancel
          </Button>
      </Form>
    );
  }

}
