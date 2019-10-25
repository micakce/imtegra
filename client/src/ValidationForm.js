import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';

const ValidationForm = ({ label, value, name, onChange, type, placeholder, required }) => {

  const [valid, setValid] = useState(false);
  const [invalid, setInvalid] = useState(false);
  // const [validMessage, setValidMessage] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');

  const validateMe = (e) => {

    if (e.target.value.match(/\d{8,11}/)) {
      setValid(true);
    }else{
      setValid(false);
      setInvalid(true);
      setInvalidMessage('Debe tener entre 8 y 11 digitos')
    }
  }

  return (
    <Form.Group md as={Col} controlId="">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        onBlur={validateMe}
        isValid={valid}
        isInvalid={invalid}
        required={required}
      />
      <Form.Control.Feedback type="invalid">{invalidMessage}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">Valido!</Form.Control.Feedback>
    </Form.Group>
  )
}

export default ValidationForm;
