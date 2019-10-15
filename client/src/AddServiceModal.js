import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddService from './AddService';

function AddServiceModal(props) {
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
                    <Modal.Title>{props.action}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <AddService
                            abonado={props.abonado}
                            action={props.action}
                            idx={props.idx}
                            hardware={props.hardware}
                            reload={props.reload}
                            service={props.service}
                            toggle={handleClose} />
                    </Modal.Body>
            </Modal>
        </>
    );
}

export default AddServiceModal;
