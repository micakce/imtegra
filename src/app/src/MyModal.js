import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddService from './AddService';

function MyModal(props) {

    return (
        <>
            <Button variant="primary" onClick={props.toggle}>
                {props.action}
            </Button>

            <Modal show={props.show} onHide={props.toggle} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <AddService reload={props.reload} toggle={handleClose} abonado={props.abonado} /> */}
                    {props.children}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyModal;
