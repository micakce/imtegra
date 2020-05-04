import React from "react";
import { Button } from 'react-bootstrap';

import { AuthConsumer } from "./authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
    )}
  </AuthConsumer>
);

export default Logout;
