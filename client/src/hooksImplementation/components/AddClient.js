/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { ClientContext } from "../contexts/ClientContext";
import {blankClient} from "../../helpers/blankStates";

const AddClient = (props) => {
  const { client, getClient, setClient, addClient, editClient } = useContext(
    ClientContext
  );
  const [isInvalid, setIsInvalid] = useState(false);
  const [subtmitIsValid, setSubtmitIsValid] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  console.log(client);

  useEffect(() => {
    if (props.action === "ADD" && firstRender){
      setClient(blankClient);
      setFirstRender(false);
    }
    const {abonado} = client;
    console.log(abonado, "verga");
    if (abonado.length > 0 && abonado.match(/\d{7}/)) {
      (async function client() {
        const response = await getClient(abonado);
        if (response.data) {
          setIsInvalid(true);
          setSubtmitIsValid(false)
        } else {
          setIsInvalid(false);
          setSubtmitIsValid(true)
        }
      })();
    } else {
      setSubtmitIsValid(false)
      setIsInvalid(false);
    }
  }, [client.abonado]
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.action === "EDIT") {
      editClient(client._id, client);
      props.toggle();
      console.log("Se editó");
    } else {
      addClient(client.abonado, client);
      setClient(blankClient)
    }
  };

  const handleChange = (e) => {
    if (firstRender) {
      setSubtmitIsValid(true);
      setFirstRender(false);
    }
    const { name, value } = e.target;
    if (name.match(/\./)) {
      const name_key1 = name.match(/(\D+)\./)[1];
      const name_key2 = name.match(/\.(\D+)/)[1];
        setClient({
          ...client,
          [name_key1]: { ...client[name_key1], [name_key2]: value },
        });
    } else {
      setClient({ ...client, [name]: value });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group md="3" as={Col} controlId="">
            <Form.Label>Abonado</Form.Label>
            <Form.Control
              disabled={props.action === "EDIT"}
              isInvalid={isInvalid}
              value={client.abonado}
              maxLength="7"
              name="abonado"
              onChange={handleChange}
              type="text"
              placeholder="5555555"
              required
            />
            <Form.Control.Feedback type="invalid">
              Abonado <Link to={`/clients/${client.abonado}`}>ya existe</Link>
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Valido!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group md as={Col} controlId="">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={client.name}
              name="name"
              onChange={handleChange}
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
              value={client.telefono}
              name="telefono"
              onChange={handleChange}
              type="text"
              placeholder="(011) 6380-9500"
            />
          </Form.Group>

          <Form.Group md as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={client.email}
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              value={client.address.street}
              name="address.street"
              onChange={handleChange}
              type="text"
              placeholder="Av. Congreso 2440"
            />
          </Form.Group>

          <Form.Group md="4" as={Col} controlId="">
            <Form.Label>Piso/Apto</Form.Label>
            <Form.Control
              value={client.address.apto}
              name="address.apto"
              onChange={handleChange}
              type="text"
              placeholder="P6 D1"
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md="6" as={Col} controlId="formGridaddress1">
            <Form.Label>Localidad</Form.Label>
            <Form.Control
              value={client.address.location}
              name="address.location"
              onChange={handleChange}
              placeholder="Belgrano"
            />
          </Form.Group>

          <Form.Group md="6" as={Col} controlId="formGridaddress2">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              value={client.address.city}
              name="address.city"
              onChange={handleChange}
              placeholder="CABA"
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md="4" as={Col} controlId="personal">
            <Form.Label>Estatus</Form.Label>
            <Form.Control
              value={client.status}
              name="status"
              onChange={handleChange}
              placeholder=""
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit" disabled={!subtmitIsValid}>
          Submit
        </Button>
        {props.action === "EDIT" ? (
          <Button
            className="ml-1"
            variant="secondary"
            onClick={() => props.toggle()}
          >
            Cancel
          </Button>
        ) : null}
      </Form>
    </>
  );
};

AddClient.defaultProps = {
  action: "ADD",
}

export default AddClient;
