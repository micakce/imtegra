import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddService from './AddService';
// import AddService from './AddService';

function ASModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {/* {props.action} */}
                Add Service
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddService />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ASModal;
