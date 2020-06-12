/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddService from "./AddService";
import "./service.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function AddServiceModal(props) {
  const [show, setShow] = useState(false);

  return (
    <>

      <Button
        size="sm"
        className="text-center"
        onClick={() =>
            setShow(true)}
      >
        <FontAwesomeIcon size="sm" icon={faEdit}  />
      </Button>
      <Modal size={props.size} show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddService
            toggle={setShow}
            action={props.action}
            hardware={props.hardware}
            abonado={props.abonado}
            reload={props.reload}
            service={props.service}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddServiceModal;
