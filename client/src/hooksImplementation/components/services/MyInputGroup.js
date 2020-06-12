/* eslint-disable react/prop-types */
import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';

const MyInputGroup = (props) => {

  return(
  <>
    <InputGroup size="sm" className="my-1">
      <InputGroup.Prepend>
        <InputGroup.Text ><b>{props.prepend}</b></InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        type="text"
        name={ props.name }
        value={props.value}
        onChange={() => console.log("toma")}
      />
      {props.children}
    </InputGroup>
  </>
  )
}

export default MyInputGroup;
