import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { AuthConsumer } from "../../authContext";
import Can from "../../Can";
import { ClientContext } from "../contexts/ClientContext";
import AddHardware from "./AddHardware";

function EditHardwareModal(props) {
  const [show, setShow] = useState(false);

  return (
    <AuthConsumer>
      {({ user }) => (
        <>
          <Can
            role={user.role}
            perform="hardware:add"
            yes={() => (
              <tr onClick={() => setShow(true)}>
                <td>{props.device.device}</td>
                <td>{props.device.model}</td>
                <td>{props.device.serial}</td>
              </tr>
            )}
            no={() => (
              <tr>
                <td>{props.device.device}</td>
                <td>{props.device.model}</td>
                <td>{props.device.serial}</td>
              </tr>
            )}
          />

          <Modal size="" show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Dispositivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddHardware
                idx={props.idx}
                action="Edit"
                device={props.device}
                toggle={setShow}
                abonado={props.abonado}
                reload={props.reload}
                deleteDevice={props.deleteDevice}
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </AuthConsumer>
  );
}

export default EditHardwareModal;
