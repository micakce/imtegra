/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../authContext";
import EditHardwareModal from "./EditHardwareModal";
import Table from "react-bootstrap/Table";
import AddHardwareModal from "./AddHardwareModal";
import { ClientContext } from "../contexts/ClientContext";

const ClientHardware = (props) => {
  const { user } = useContext(AuthContext);
  const { client, deleteDevice, getAndSetClient } = useContext(ClientContext);

  return (
    <Card>
      <Card.Header as="h5">Hardware</Card.Header>
      <Card.Body>
        <Table size="sm" hover>
          <thead className="table-light">
            <tr>
              <th>Dispositivo</th>
              <th>Modelo</th>
              <th>Serial</th>
            </tr>
          </thead>
          <tbody>
            {client.hardware.map((device, idx) => {
              return (
                <EditHardwareModal
                  key={idx.toString()}
                  idx={idx}
                  device={device}
                  abonado={client.abonado}
                  deleteDevice={() => deleteDevice(device._id, client.abonado) }
                  reload={() => getAndSetClient(client.abonado)}
                />
              );
            })}
            <AddHardwareModal
              title="Agregar Dispositivo"
              abonado={client.abonado}
              reload={() => getAndSetClient(client.abonado)}
            />
          </tbody>
        </Table>

        <br></br>

      </Card.Body>
    </Card>
  );
};

export default ClientHardware;
