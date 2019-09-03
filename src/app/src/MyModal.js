import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddService from './AddService';

function MyModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(!false);
    }
    const handleShow = () => {
        setShow(!true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar Servicio
            </Button>

            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddService toggle={handleClose} abonado={props.abonado} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyModal;
