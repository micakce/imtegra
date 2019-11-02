import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "./authContext";
import Login from "./Login";

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/clients" />
      ) : (
        <div>
          <h2>Welcome to React RBAC Tutorial.</h2>
          <Login />
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;
