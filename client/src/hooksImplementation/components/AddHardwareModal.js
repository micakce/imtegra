/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddHardware from "../components/AddHardware";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddHardwareModal(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <td
        colSpan="5"
        className="text-center"
        onClick={() => setShow(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="myButton"/>
      </td>

      <Modal size={props.size} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddHardware
            action="Agregar"
            toggle={setShow}
            abonado={props.abonado}
            reload={props.reload}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddHardwareModal;
