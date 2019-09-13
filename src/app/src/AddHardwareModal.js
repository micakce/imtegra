import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddHardware from './AddHardware';

function AddHardwareModal(props) {
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
                {props.action}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddHardware
                        idx={props.idx}
                        action={props.action}
                        device={props.device}
                        reload={props.reload}
                        toggle={handleClose}
                        abonado={props.abonado} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddHardwareModal;
