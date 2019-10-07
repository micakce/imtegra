import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {ADIConfigTemplate} from './testVariables';

function CreateConfigModal(props) {

  const [ show, setShow ] = useState(false);
const [config, setConfig] = useState('Hola');

  const handleClick = () => {
    var MyADIConfigTemplate = ADIConfigTemplate.replace(/\n/, <br></br>)
    setConfig(MyADIConfigTemplate.replace(/{ip}/, props.service.service.ip));
    // setConfig(JSON.stringify(props));
    setShow(true);
    console.log(props);
  }

  const handleClose = () => {
    setShow(false);
  }

    return (
        <>
          <Button variant="primary" onClick={handleClick} >
                {props.action}
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {config}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateConfigModal;
