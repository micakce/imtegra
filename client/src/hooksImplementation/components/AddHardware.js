/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { axiosInstance } from "../../helpers/axios";

class AddHardware extends Component {
  constructor(props) {
    super(props);
    if (props.action === "Edit") {
      this.state = props.device;
    } else {
      this.state = {
        device: "",
        model: "",
        code: "",
        serial: "",
        description: "",
      };
    }
    this.handleChange = this.handleChange.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  addDevice(e) {
    if (this.props.action === "Edit") {
      const idx = this.props.idx;
      axiosInstance
        .put(`/clients/device/edit/${this.props.abonado}`, {
          ...this.state,
          idx,
        })
        .then(() => {
          this.props.toggle();
          this.props.reload();
        })
        .catch((error) => console.log(error));
      e.preventDefault();
    } else {
      axiosInstance
        .put(`/clients/device/${this.props.abonado}`, this.state)
        .then(() => {
          this.props.toggle();
          this.props.reload();
        });
      e.preventDefault();
    }
  }

  deleteDevice() {
    this.props.deleteDevice();
    this.props.toggle();
    this.props.reload();
  }
  render() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="">
            <Form.Label>Equipo</Form.Label>
            <Form.Control
              size="sm"
              value={this.state.device}
              name="device"
              onChange={this.handleChange}
              type="text"
              as="select"
              placeholder=""
            >
              <option>Seleccionar</option>
              <option>Switch</option>
              <option>Router</option>
              <option>SFP</option>
              <option>Patch</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              size="sm"
              value={this.state.model}
              name="model"
              onChange={this.handleChange}
              type="text"
              as="select"
              placeholder=""
            >
              {this.state.device === "Switch" ? (
                <React.Fragment>
                  <option>Seleccionar</option>
                  <option>SG350</option>
                  <option>DELL</option>
                </React.Fragment>
              ) : this.state.device === "Router" ? (
                <React.Fragment>
                  <option>Seleccionar</option>
                  <option>C881</option>
                  <option>C1921</option>
                </React.Fragment>
              ) : this.state.device === "SFP" ? (
                <React.Fragment>
                  <option>Seleccionar</option>
                  <option>D20Km</option>
                  <option>U20Km</option>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <option>Seleccionar</option>
                  <option>UTP</option>
                  <option>FO</option>
                </React.Fragment>
              )}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="">
            <Form.Label>Serial</Form.Label>
            <Form.Control
              size="sm"
              value={this.state.serial}
              name="serial"
              onChange={this.handleChange}
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              size="sm"
              value={this.state.description}
              name="description"
              onChange={this.handleChange}
              type="text"
              placeholder=""
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <div style={{ textAlign: "right" }}>
          {this.props.action === "Edit" ? (
            <Button
              variant="danger"
              onClick={this.deleteDevice}
            >
              Delete
            </Button>
          ) : (
            ""
          )}{" "}
          <Button type="submit" variant="warning" onClick={this.addDevice}>
            Save
          </Button>
        </div>
      </Form>
    );
  }
}

export default AddHardware;
