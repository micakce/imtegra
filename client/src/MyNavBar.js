import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthConsumer } from "./authContext";

const MyNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Imtegra</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-between"
        id="basic-navbar-nav"
      >
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <NavDropdown title="Clientes" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/clients/all">
              Todos
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/clients/add">
              Agregar
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/clients/client">
              Buscar
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <AuthConsumer>
          {({ user, authenticated, logout }) =>
            authenticated ? (
              <Nav>
                {/* <Nav.Link onClick={logout}>Logout</Nav.Link> */}
                <NavDropdown title={user.role} style={{ float: "right" }}>
                  <NavDropdown.Item>{user.email}</NavDropdown.Item>
                  <NavDropdown.Item>{user.id}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              ""
            )
          }
        </AuthConsumer>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavBar;
