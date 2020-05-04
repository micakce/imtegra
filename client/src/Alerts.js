import React from "react";
import {Alert} from 'react-bootstrap';

const AlertDismissibleDanger =  (props) => {
    return (
      <Alert variant="danger" onClick={() => props.onClick(false)}  >
        <Alert.Heading>{props.message}</Alert.Heading>
      </Alert>
    );
  }
export default AlertDismissibleDanger;
