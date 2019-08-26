import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

export default class AddClient extends Component {

  constructor(props) {
    super(props);
    if (props.client) {
      this.state = props.client;
    } else {
      this.state = {
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
            service: "",
            speed: ""
          }
        ]
        // edit: false
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.addClient = this.addClient.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name.match(/\./)) {
      const key = name.match(/(\D+)\./)[1];
      const key_value = name.match(/\.(\D+)/)[1];
      this.setState({ [key]: { ...this.state[key], [key_value]: value } });
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
                service: "",
                speed: ""
              }
            ]
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
                service: "",
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
            <Form.Control as="input" value={this.state.abonado} name="abonado" onChange={this.handleChange} type="number" placeholder="5555555" required />
          </Form.Group>

          <Form.Group md as={Col} controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={this.state.name} name="name" onChange={this.handleChange} type="text" placeholder="Telecentro SA" required />
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
        <br/>
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
