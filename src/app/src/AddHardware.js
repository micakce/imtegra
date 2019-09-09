import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

class AddHardware extends Component {
    constructor(props) {
        super(props);
        if (props.action === "Edit") {
            this.state = props.device;
        } else {
            this.state = { device: "" };
        }
        this.handleChange = this.handleChange.bind(this);
        this.addDevice = this.addDevice.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addDevice(e) {
        if (this.props.action === 'Edit') {
            const idx = this.props.idx;
            fetch(`/clients/device/edit/${this.props.abonado}`, {
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

            fetch(`/clients/device/${this.props.abonado}`, {
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

    render() {
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Equipo</Form.Label>
                        <Form.Control size="sm" value={this.state.device} name="device" onChange={this.handleChange} type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control size="sm" value={this.state.model} name="model" onChange={this.handleChange} type="text" placeholder="" />
                    </Form.Group>
                </Form.Row>
                <Button type="submit" variant="warning" onClick={this.addDevice}>
                    Save
                </Button>
            </Form>
        )
    }
}

export default AddHardware;