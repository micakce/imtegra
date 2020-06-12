/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Table, Badge, Button } from "react-bootstrap";
import AddServiceModal from './AddServiceModal';
import './service.css';
import { useHistory } from "react-router";
import { ClientContext } from "../../contexts/ClientContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";

const ServicesTable = (props) => {
  const history = useHistory();
  const { client, getAndSetClient } = useContext(ClientContext);

  return (
    <>
      <Table className="" size="sm" hover>
        <thead>
          <tr>
            <td> Servicio</td>
            <td>PM</td>
            <td>Implementador</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {props.services.map((service) => {
            return (
              <tr key={service._id}>
                <td className="align-middle" >
                  <b className="mr-2">{`${service.service} - ${service.plan}`}</b>
                  {service.medium === "CO" ? (
                    <Badge variant="primary">{service.medium}</Badge>
                  ) : (
                    <Badge variant="warning">{service.medium}</Badge>
                  )}
                </td>
                <td className="align-middle" >
                  <b>PM:</b> {service.pm}
                </td>
                <td className="align-middle" >
                  <b>IM:</b> {service.im}
                </td>
                <td className="align-middle" >
                  <b>Status:</b>{" "}
                  <Badge variant="success">{service.status}</Badge>
                </td>
                <td className="align-middle" >
                  <Button
                    className="ml-2"
                    size="sm"
                    onClick={() =>
                      history.push(
                        `/clients/${client.abonado}/service/${service._id}`
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faExpandAlt} />
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr>
            <AddServiceModal
              title="Agregar Servicio"
              action="Agregar"
              hardware={client.hardware}
              abonado={client.abonado}
              reload={() => getAndSetClient(client.abonado)}
            />
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ServicesTable;
