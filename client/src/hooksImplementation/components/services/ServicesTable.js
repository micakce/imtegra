/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faExpand,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ClientContext } from "../../contexts/ClientContext";

const ServicesTable = (props) => {
  console.log(props.services);
  const history = useHistory();
  const { client } = useContext(ClientContext);

  return (
    <>
      <table className="table table-hover">
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
                <td>
                  <b className="mr-2">{`${service.service} - ${service.plan}`}</b>
                  {service.medium === "CO" ? (
                    <Badge variant="primary">{service.medium}</Badge>
                  ) : (
                    <Badge variant="warning">{service.medium}</Badge>
                  )}
                </td>
                <td>
                  <b>PM:</b> {service.pm}
                </td>
                <td>
                  <b>IM:</b> {service.im}
                </td>
                <td>
                  <b>Status:</b>{" "}
                  <Badge variant="success">{service.status}</Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    onClick={() =>
                      history.push(
                        `/clients/${client.abonado}/service/${service._id}`
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button size="sm" className="mx-sm-2">
                    <FontAwesomeIcon className="" icon={faEdit} />
                  </Button>
                  {/* <FontAwesomeIcon icon={ faExpand }/> */}
                  {/* <FontAwesomeIcon icon={ faExpandAlt }/> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ServicesTable;
