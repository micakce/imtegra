/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import  Card from "react-bootstrap/Card";
import  Accordion from "react-bootstrap/Accordion";
import MyModal from "../../../MyModal";
import { AuthContext } from "../../../authContext";
import Can from "../../../Can";
import ServicesTable from "./ServicesTable";
import AddService from "../../../AddService";



const ClientServices = (props) => {

  const { user } = useContext(AuthContext);
  console.log(props.services);

  return (
  <Card>
    <Card.Header as="h5">Servicios</Card.Header>
    <Card.Body>
      <Accordion>
            <ServicesTable
              services={props.services}
            />
        <br></br>

        <Can
          role={user.role}
          perform="services:add"
          yes={() => (
            <MyModal
              title="Agregar Servicio"
              buttonLabel="Agregar"
              render={(toggle) => (
                <AddService
                  toggle={toggle}
                  action="Agregar"
                  hardware={props.hardware}
                  abonado={props.abonado}
                />
              )}
            />
          )}
        />
      </Accordion>
    </Card.Body>
  </Card>
  )
};

export default ClientServices;
