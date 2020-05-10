/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import MyModal from "../../MyModal";
import { AuthContext } from "../../authContext";
import Can from "../../Can";
import EditHardwareModal from "../../EditHardwareModal";
import AddHardware from "../../AddHardware";
import Table from 'react-bootstrap/Table';

const ClientHardware = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <Card.Header as="h5">Hardware</Card.Header>
      <Card.Body>
        <Table size="sm" hover >
          <thead className="table-light">
            <tr>
              <th>Dispositivo</th>
              <th>Modelo</th>
              <th>Serial</th>
            </tr>
          </thead>
          <tbody>
            {props.hardware.map((device, idx) => {
              return (
                <EditHardwareModal
                  id={device._id}
                  key={idx.toString()}
                  // deleteDevice={this.deleteDevice}
                  // canEdit={CanEditHardware}
                  device={device}
                  idx={idx}
                  render={(toggle) => (
                    <AddHardware
                      id={device._id}
                      idx={idx}
                      device={device}
                      action={"Edit"}
                      toggle={toggle}
                      // reload={this.searchClient}
                      abonado={props.abonado}
                      // deleteDevice={this.deleteDevice}
                    />
                  )}
                />
              );
            })}
          </tbody>
        </Table>

        <br></br>

        <Can
          role={user.role}
          perform="hardware:add"
          yes={() => (
            <MyModal
              title="Agregar Dispositivo"
              buttonLabel="Agregar"
              render={(toggle) => (
                <AddHardware
                  action={"Add"}
                  toggle={toggle}
                  // reload={this.searchClient}
                  abonado={props.abonado}
                />
              )}
            />
          )}
        />
      </Card.Body>
    </Card>
  );
};

export default ClientHardware;
