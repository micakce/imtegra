import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ADIConfigTemplate, CO_ADIConfigTemplate } from './configTemplates';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const templates = {
  ADI: ADIConfigTemplate,
  L2VPN: ADIConfigTemplate,
  ADICO: CO_ADIConfigTemplate,
  CO_L2VPN: CO_ADIConfigTemplate,
}

function CreateConfigModal(props) {

  const [show, setShow] = useState(false);
  const [config, setConfig] = useState('Hola');
  const [linkhref, setLinkhref] = useState('None');
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    // const output = ADIConfigTemplate(props);
    const output = templates[props.template](props);
    setConfig(output)
    setLinkhref(makeTextFile(output))
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
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
