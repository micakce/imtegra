import React, { Component } from 'react';
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap';

export default class AddClient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      abonado: "",
      name: "",
      telefono:"",
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
    }
    this.addClient = this.addClient.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  addClient(e) {
    const { name, value } = e.target;
    if (name.match(/\./)){
      const key = name.match(/(\D+)\./)[1];
      const key_value = name.match(/\.(\D+)/)[1];
      let user = Object.assign({}, this.state[key])
      user[key_value] = value
      this.setState({
        [key]: user
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  onSubmit(e){
    fetch('http://18.231.73.72:3000/clients', {
      method: 'POST',
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
          telefono:"",
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

  render() {
    return(
      <Form>
        <Form.Row>
          <Form.Group md="3" as={Col} controlId="">
            <Form.Label>Abonado</Form.Label>
            <Form.Control value={this.state.abonado}name="abonado" onChange={this.addClient} type="number" placeholder="5555555" />
          </Form.Group>

          <Form.Group md as={Col} controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control value={this.state.name}name="name" onChange={this.addClient} type="text" placeholder="Telecentro SA" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md as={Col} controlId="">
            <Form.Label>Telefono</Form.Label>
            <Form.Control value={this.state.telefono} name="telefono" onChange={this.addClient} type="text" placeholder="(011) 6380-9500" />
          </Form.Group>

          <Form.Group md as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={this.state.email} name="email" onChange={this.addClient} type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="">
            <Form.Label>Calle</Form.Label>
            <Form.Control value={this.state.address.street} name="address.street" onChange={this.addClient} type="text" placeholder="Av. Congreso 2440" />
          </Form.Group>

          <Form.Group md="4" as={Col} controlId="">
            <Form.Label>Piso/Apto</Form.Label>
            <Form.Control value={this.state.address.apto} name="address.apto" onChange={this.addClient} type="text" placeholder="P6 D1" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md="6" as={Col} controlId="formGridaddress1">
            <Form.Label>Localidad</Form.Label>
            <Form.Control value={this.state.address.location} name="address.location" onChange={this.addClient} placeholder="Belgrano" />
          </Form.Group>

          <Form.Group md="6" as={Col} controlId="formGridaddress2">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control value={this.state.address.city} name="address.city" onChange={this.addClient} placeholder="CABA" />
          </Form.Group>
        </Form.Row>

        <Button onClick={this.onSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

}
