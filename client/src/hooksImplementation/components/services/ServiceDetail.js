/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import { Badge, Row, Card, Col } from 'react-bootstrap';
import {useParams} from 'react-router';

const ServiceDetail = (props) => {

  const { id } = useParams();
  const service = props.client.services.find(service => service._id === id);


  return(
  <>
    { service ?
    <Row>
      <Col>
        <Card.Title> Datos </Card.Title>
        <div> <b>Servicio: </b>{` ${service.service} - ${service.plan} Mbps`} </div>
        <div> <b>Tecnología: </b> <Badge variant="warning"> {` ${service.medium}`} </Badge> </div>
        <div> <b>Equipo: </b>  {service.device}</div>
        <div> <b>Interfaz: </b> {service.interface} </div>
      </Col>
      <Col>
        <Card.Title> Direccionamiento </Card.Title>
        <div> <b>Red: </b>{service.red} </div>
        <div> <b>IP: </b>{service.ip} </div>
        <div> <b>DG: </b>{service.dg} </div>
        <div> <b>Mask: </b>{service.mask} </div>
        <div> <b>VLAN: </b>{service.vlan} </div>
      </Col>
      <Col>
        <Card.Title> Monitoria </Card.Title>
        <div> <b>IP: </b>{service.ip_mon} </div>
        <div> <b>DG: </b>{service.dg_mon} </div>
        <div> <b>Mask: </b>{service.mask_mon} </div>
        <div> <b>VLAN: </b> {service.vlan_mon} </div>
      </Col>
      <Col>
        <Card.Title>Patcheo</Card.Title>
        <div> <b>Hub: </b>{service.hub} - <b>Obra: </b> {service.obra ?  service.obra : ""}</div>
        <div> <b>Patcheo: </b>{service.rack} - {service.patchera} - {service.position} </div>
        <div> <b>Switch: </b>{service.nexus} </div>
        <div> <b>Port: </b>{service.nexus_port} </div>
        <div> <b>Dist: </b>{service.dist ? `${service.dist} mts` : ""} </div>
        <div> <b>Att: </b>{service.att ? `${service.att} dB` : ""} </div>
      </Col>
    </Row>
    :
    <h1>LOADING</h1>
    }
  </>
  )
}

export default ServiceDetail;
