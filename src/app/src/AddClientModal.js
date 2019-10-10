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
      <div className="text-right">
        <Button className="mr-3 mb-3" variant="primary" onClick={handleShow} hidden={props.hideEditButton} >
        {props.action}
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddClient
            action={props.action}
            client={props.client}
            reload={props.reload}
            toggle={handleClose}
            hidden={props.hideEditButton}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddClientModal;
