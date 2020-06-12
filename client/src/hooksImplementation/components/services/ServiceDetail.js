/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import {
  Badge,
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Spinner,
} from "react-bootstrap";
import { useParams } from "react-router";
import MyInputGroup from "./MyInputGroup";
import EditServiceModal from "./EditServiceModal";
import {ClientContext} from "../../contexts/ClientContext";
import AdiFo from "./AdiFo";

const ServiceDetail = (props) => {
  const { id } = useParams();
  const { client, getAndSetClient } = useContext(ClientContext);
  const service = props.client.services.find((service) => service._id === id);
  const hardware = props.client.hardware;

  const renderService = (param) => {
    switch (service.medium) {
      case 'FO':
        return <AdiFo
          abonado={client.abonado}
          hardware={client.hardware}
          service={service}
          reload={() => getAndSetClient(props.client.abonado)}
        />
      default:
        return <h1>No hay vida</h1>
    }
  }

  return (
    <>
      {service ? (
        renderService(service.medium)
      ) : (
        <Spinner animation="grow" />
      )}
    </>
  );
};

export default ServiceDetail;
