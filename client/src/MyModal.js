import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal(props) {

  const [show, setShow] = useState(false);

    return (
        <>
          <Button variant="primary" hidden={props.hideEditButton} onClick={() => setShow(true)}>
            {props.buttonLabel}
            </Button>

            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {props.render(setShow)}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyModal;
