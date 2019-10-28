import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ADIDiagramTemplate } from './diagramTemplates';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const templates = {
    ADI: ADIDiagramTemplate
}

function CreateDiagramModal(props) {

  const [show, setShow] = useState(false);
  const [config, setDiagram] = useState('Hola');
  const [linkhref, setLinkhref] = useState('None');
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    const output = templates[props.template](props);
    setDiagram(output)
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
      <Button variant="success" onClick={handleClick} >
      Diagram
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
          <a href={linkhref} download={`${props.abonado}-${props.clientName}.drawio`} > Download </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateDiagramModal;