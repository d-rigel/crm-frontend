import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../../assets/img/crm.jpg";

export const Header = () => {
  return (
    <Navbar collapseOnSelect bg="info" expand="md">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" with="20px" />
        </Navbar.Brand>
        <Navbar.Toggle arial-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/Tickets">Tickets</Nav.Link>
            <Nav.Link href="/Logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
