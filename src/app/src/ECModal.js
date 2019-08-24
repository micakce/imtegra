import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddClient from './AddClient';

function ECModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(props)
        setShow(true);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddClient client={props.client} reload={props.reload} toggle={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ECModal;