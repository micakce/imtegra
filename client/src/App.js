import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AddClient from "./AddClient.js";
import AllClients from "./AllClients.js";
import Home from "./Home";
import ViewClient from "./ViewClient";
import CallbackPage from "./callback";
import Auth from './Auth';
import { AuthConsumer } from './authContext';
import PrintOSADI from './templates/PrintOSADI';

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
                <Nav.Link as={Link} to="/print">Print</Nav.Link>
                <NavDropdown title="Clientes" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/clients/all">Todos</NavDropdown.Item>
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/print"  component={PrintOSADI} />
            <Route path="/clients/all" component={AllClients} />
            <Route path="/clients/add" render={props => <AddClient {...props} />} />
            <Route path="/clients/client" render={ props => <ViewClient  {...props} />} />
            <Route path="/callback" component={CallbackPage} />
          </Switch>
        </Router>
      </Auth>
    </div>
  );
}

export default App;
