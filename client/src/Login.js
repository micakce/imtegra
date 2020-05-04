import React, {useState} from "react";

import { AuthConsumer } from "./authContext";
import {Form, Col, Row, Button} from "react-bootstrap";
import AlertDismissibleDanger from "./Alerts";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);

  const alertFunction = (message) => {
    setMessage(message);
    setAlert(true);
    console.log("No papa");
  }
  return (

   <AuthConsumer>
    {({ initiateLogin }) => (

      <div>
        {alert ? <AlertDismissibleDanger onClick={setAlert} message={message} /> : null }
        <Form onSubmit={(e) => initiateLogin({e, email, password, alertFunction})} >
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Col>
          </Form.Group>
          <fieldset>
          </fieldset>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" >Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )}
  </AuthConsumer>
) };

export default Login;
