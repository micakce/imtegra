import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { blankState } from './testVariables';
import { AuthConsumer } from './authContext';
import Can from './Can';
import {axiosInstance} from './helpers/axios';
// import ValidationForm from './ValidationForm';

 class AddClient extends Component {

  constructor(props) {
    super(props);
    if (props.client) {
      this.state = {
        ...props.client,
        validation: {
          abonado: {
            valid: false,
            invalid: false,
            message: '',
            editable: false
          },
          submit: true
        }
      };
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
      }
    } else if (name === 'abonado') {
      // returns if user inputs non digits values
      if (value.match(/[^0-9]/)) {
        return
      }
      this.setState({ [name]: value });
      if (value.match(/^\d{7}$/)) {
        axiosInstance.get(`/clients/client/${value}`)
          .then(res => {
            if (!res.data) {
              this.setState({
                validation: {
                  ...this.state.validation,
                  abonado: { valid: true, invalid: false, editable: true, message: '' },
                  submit: true
                }
              });
            } else {
              this.setState({
                validation: {
                  ...this.state.validation,
                  [name]: {
                    valid: false,
                    invalid: true,
                    message: <p>Abonado ya <Link style={{color: "red", textDecoration: "underline"}} to={`/clients/client/${this.state.abonado}`}>existe</Link></p>,
                    editable: true
                  },
                  submit: false
                }
              });
            }
          })
      } else {
        this.setState({
          validation: {
            ...this.state.validation,
            [name]: { valid: false, invalid: true, message: 'Debe tener al menos 7 digitos', editable: true },
            submit: false
          }
        })
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  addClient(e) {
    if (this.props.action === 'edit') {
      axiosInstance.put(`/clients/${this.props.client._id}`, this.state)
        .then(res => {
          console.log("First 'edit' rule");
          console.log(res);
          this.setState(blankState)
          this.props.toggle();
          this.props.reload();
        })
        .catch(err => console.error(err));
      e.preventDefault();

    } else if (this.props.action === 'add') {
      axiosInstance.post('/clients', this.state)
        .then(res => {
          console.log("Second add rule");
          console.log(res);
          this.props.toggle();
          this.props.reload();
        })
        .catch(err => console.error(err));
      e.preventDefault();

    } else {
      axiosInstance.post('/clients', this.state)
        .then(res => {
          console.log("Third add rule");
          console.log(res);
        })
        .catch(err => console.error(err));
      e.preventDefault();
      this.props.history.push(`/clients/client/${this.state.abonado}`)

    }
  }

  render() {
    const validation = this.state.validation;
    return (
      <AuthConsumer>
        { ({ user }) => (
          <Can
            role={user.role}
            perform="clients:add"
            yes={() => (
              <Form onSubmit={this.addClient} >
                <Form.Row>
                  <Form.Group md="3" as={Col} controlId="" >
                    <Form.Label>Abonado</Form.Label>
                    <Form.Control
                      disabled={!validation.abonado.editable}
                      isValid={validation.abonado.valid}
                      isInvalid={validation.abonado.invalid}
                      value={this.state.abonado}
                      maxLength="7"
                      name="abonado"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="5555555"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{validation.abonado.message}</Form.Control.Feedback>
                    <Form.Control.Feedback type="valid">Valido!</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group md as={Col} controlId="">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Telecentro SA"
                      required
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group md as={Col} controlId="">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      value={this.state.telefono}
                      name="telefono"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="(011) 6380-9500"
                    />
                  </Form.Group>
                  {/* <ValidationForm */}
                  {/*   label="Telefono" */}
                  {/*   value={this.state.telefono} */}
                  {/*   name="telefono" */}
                  {/*   onChange={this.handleChange} */}
                  {/*   type="number" */}
                  {/*   placeholder="(011) 6380-9500" */}
                  {/* /> */}

                  <Form.Group md as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                      type="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="">
                    <Form.Label>Calle</Form.Label>
                    <Form.Control
                      value={this.state.address.street}
                      name="address.street"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Av. Congreso 2440"
                    />
                  </Form.Group>

                  <Form.Group md="4" as={Col} controlId="">
                    <Form.Label>Piso/Apto</Form.Label>
                    <Form.Control
                      value={this.state.address.apto}
                      name="address.apto"
                      onChange={this.handleChange}
                      type="text"
                      placeholder="P6 D1"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group md="6" as={Col} controlId="formGridaddress1">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control
                      value={this.state.address.location}
                      name="address.location"
                      onChange={this.handleChange}
                      placeholder="Belgrano"
                    />
                  </Form.Group>

                  <Form.Group md="6" as={Col} controlId="formGridaddress2">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                      value={this.state.address.city}
                      name="address.city"
                      onChange={this.handleChange}
                      placeholder="CABA"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group md="4" as={Col} controlId="personal">
                    <Form.Label>Estatus</Form.Label>
                    <Form.Control
                      value={this.state.status}
                      name="status"
                      onChange={this.handleChange}
                      placeholder=""
                    />
                  </Form.Group>
                </Form.Row>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!validation.submit}>
                  Submit
                </Button>
                <Button className="ml-1" variant="secondary" onClick={() => this.props.toggle(false)}>
                  Cancel
                </Button>
              </Form>
            )}
            no={() => <h2>Sos un venao sin permisos</h2>}
          />
        )}
      </AuthConsumer>
    );
  }
}

AddClient.propTypes = {
  client: PropTypes.object,
  toggle: PropTypes.func,
  history: PropTypes.object,
  reload: PropTypes.func,
  action: PropTypes.string,
}

export default AddClient;
