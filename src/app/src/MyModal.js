import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
                {/* {props.action} */}
                Add Service
      </Button>

            <Modal show={!show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                    {/* <AddService /> */}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyModal;
