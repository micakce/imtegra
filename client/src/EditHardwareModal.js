import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthConsumer } from './authContext';
import Can from './Can';

function EditHardwareModal(props) {

  const [show, setShow] = useState(false);

  return (
    <AuthConsumer>

      { ({user}) => (

        <>
          <Can
            role={user.role}
            perform="hardware:add"
            yes={() => (
              <tr onClick={() => setShow(true)}>
                <td>{props.device.device}</td>
                <td>{props.device.model}</td>
                <td>{props.device.serial}</td>
              </tr>
            )}
            no={()=>(
              <tr >
                <td>{props.device.device}</td>
                <td>{props.device.model}</td>
                <td>{props.device.serial}</td>
              </tr>
            )}
          />

          <Modal size={props.size} show={show} onHide={() => setShow(false)} >
            <Modal.Header closeButton>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.render(setShow)}
            </Modal.Body>
          </Modal>
        </>
      ) }
    </AuthConsumer>
  );
}

export default EditHardwareModal;
