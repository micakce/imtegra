import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddClient from './AddClient';

function AddClientModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () =>
  {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      {props.action}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddClient action={props.action} client={props.client} reload={props.reload} toggle={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddClientModal;
