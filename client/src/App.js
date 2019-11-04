import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AddClient from "./AddClient.js";
import AllClients from "./AllClients.js";
import Home from "./Home";
import ViewClient from "./ViewClient";
import CallbackPage from "./callback";
import Auth from './Auth';
import Profile from './Profile';
import Logout from './Logout';
import { AuthConsumer } from './authContext';

function App() {

  return (
    <div className="container">
      <Auth>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Imtegra</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
              <Nav clas="mr-auto" >
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title="Clientes" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/clients/">Todos</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/clients/implementacion">En Implementacion</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/clients/add">Agregar</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/clients/client">Buscar</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <AuthConsumer>
                {({ user, authenticated, logout }) => (
                  authenticated ?
                  <Nav>
                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                    <NavDropdown title={user.role} style={{float: "right"}}>
                      <NavDropdown.Item>
                        {user.email}
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        {user.id}
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  :
                  "Venao"
                )}
              </AuthConsumer>
            </Navbar.Collapse>
          </Navbar>
          <Profile />
          <Logout />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/clients/" exact component={AllClients} />
            <Route path="/clients/implementacion" component={AllClients} />
            <Route path="/clients/add" component={AddClient} />
            <Route path="/clients/client" component={ViewClient} />
            <Route path="/callback" component={CallbackPage} />
            {/* <Route path="/clients/client" render={props  => <ViewClient {...props} />} /> */}
            {/* <Route path="/clients/client/:id" render={props  => <ViewClient {...props} />} /> */}
          </Switch>
        </Router>
      </Auth>
    </div>
  );
}

export default App;
