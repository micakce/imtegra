/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import MyModal from "../../MyModal";
import AddClient from "./AddClient";
import { AuthContext } from "../../authContext";
import Can from "../../Can";
import { useHistory } from "react-router";
import {ClientContext} from "../contexts/ClientContext";

const ClientInfo = (props) => {
  const { user } = useContext(AuthContext);
  const { getClient, deleteClient } = useContext(ClientContext);
  const history = useHistory();

  const [search, setSearch] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (search.match(/\d{7}/)) {
      (async function client() {
        const response = await getClient(search);
        if (response.data) {
          setIsInvalid(false);
          history.push(`/clients/${search}`);
        } else {
          setIsInvalid(true);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h5 className="my-auto">Datos del Cliente</h5>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Search"
              maxLength={7}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="mr-2"
              size="sm"
              isInvalid={isInvalid}
            />
            <Form.Control.Feedback size="sm" type="invalid">
              No existe
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Valido!</Form.Control.Feedback>
          </Form>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>
              {" "}
              {`${props.client.abonado} - ${props.client.name}`}{" "}
            </Card.Title>
            <div>
              <b>Domicilio:</b>{" "}
              {` ${props.client.address.street}, ${props.client.address.apto}`}{" "}
            </div>
            <div>
              <b>Localidad:</b>{" "}
              {` ${props.client.address.location}, ${props.client.address.city}`}{" "}
            </div>
          </Col>
          <Col>
            <Card.Title> Informacion de Contacto </Card.Title>
            <div>
              <b>Telefono:</b> {` ${props.client.telefono}`}
            </div>
            <div>
              <b>Email:</b> {` ${props.client.email}`}{" "}
            </div>
          </Col>
          <Col>
            <Card.Title> Contacto Tecnico </Card.Title>
            <div>
              <b>Domicilio:</b>{" "}
              {` ${props.client.address.street}, ${props.client.address.apto}`}{" "}
            </div>
            <div>
              <b>Localidad:</b>{" "}
              {` ${props.client.address.location}, ${props.client.address.city}`}{" "}
            </div>
          </Col>
        </Row>
      </Card.Body>
      <br></br>
      <div className="text-right mr-3 mb-3">
        <Can
          role={user.role}
          perform="clients:edit"
          yes={() => (
            <MyModal
              buttonLabel="Editar"
              hideEditButton={props.client.hideEditButton}
              title="Editar Cliente"
              render={(toggle) => (
                <AddClient
                  toggle={toggle}
                  action="EDIT"
                  client={props.client}
                />
              )}
            />
          )}
        />{" "}
        <Can
          role={user.role}
          perform="clients:delete"
          yes={() => (
            <Button
              variant="danger"
              onClick={() => deleteClient(props.client._id)}
              hidden={isInvalid}
            >
              Eliminar
            </Button>
          )}
        />
      </div>
    </Card>
  );
};

export default ClientInfo;
