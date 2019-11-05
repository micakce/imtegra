import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { configAdiFo } from './templates/configAdiFo';
import { configAdiCo } from './templates/configAdiCo';
import { configL2vpnFo } from './templates/configL2vpnFo';

const templates = {
  ADI: configAdiFo,
  L2VPN: configL2vpnFo,
  ADI_CO: configAdiCo,
  L2VPN_CO: configAdiCo,
}

function CreateConfigModal(props) {

  const [show, setShow] = useState(false);
  const [config, setConfig] = useState('Hola');
  const [linkhref, setLinkhref] = useState('None');
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    const output = templates[props.template](props);
    setConfig(output)
    setLinkhref(makeTextFile(output))
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
    setCopied(false);
  }

  const makeTextFile = (text) => {

    var data = new Blob([text], { type: 'text/plain' });

    return window.URL.createObjectURL(data);
  }

  return (
    <>
      <Button variant="secondary" onClick={handleClick} >
        Template
      </Button>

      <Modal show={show} onHide={handleClose}  scrollable xl >
        <Modal.Header closeButton>
          <Modal.Title>{ props.abonado } - { props.clientName }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {config}
        </Modal.Body>
        <Modal.Footer>
          <b hidden={!copied} className="mr-8 text-danger" >Copiado al portapapeles!</b>
          <CopyToClipboard onCopy={() => setCopied(true)} text={config} >
            <Button variant="info" >
              Copiar
            </Button>
          </CopyToClipboard>
          <a href={linkhref} download={`${props.abonado}-${props.clientName}.txt`} > Download </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateConfigModal;