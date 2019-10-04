import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AddClient from "./AddClient.js";
import AllClients from "./AllClients.js";
import Home from "./Home";
import ViewClient from "./ViewClient";


function AppRouter() {

    return (
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
                    {/* <Form inline> */}
                    {/*     <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    {/*     <Button variant="outline-success">Search</Button> */}
                    {/* </Form> */}
                </Navbar.Collapse>
            </Navbar>
            <Route path="/" exact component={Home} />
            {/* <Route path="/clients/" exact render={(props) => <AllClients {...props} />} /> */}
            <Route path="/clients/" exact component={AllClients} />
            <Route path="/clients/implementacion" component={AllClients} />
            <Route path="/clients/add" component={AddClient} />
            <Route path="/clients/client" component={ViewClient} />
        </Router>

    );
}

export default AppRouter;
