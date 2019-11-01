import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AddClient from "./AddClient.js";
import AllClients from "./AllClients.js";
import Home from "./Home";
import ViewClient from "./ViewClient";
import CallbackPage from "./callback";
import Auth from './Auth';


function AppRouter() {

    return (
      <Auth>
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Imtegra</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title="Clientes" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/clients/">Todos</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/clients/implementacion">En Implementacion</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/clients/add">Agregar</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/clients/client">Buscar</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/clients/" exact component={AllClients} />
            <Route path="/clients/implementacion" component={AllClients} />
            <Route path="/clients/add" component={AddClient} />
            <Route path="/clients/client" render={props  => <ViewClient {...props} />} />
            <Route path="/callback" component={CallbackPage} />
            {/* <Route path="/clients/client/:id" render={props  => <ViewClient {...props} />} /> */}
          </Switch>
        </Router>
      </Auth>

    );
}

export default AppRouter;
