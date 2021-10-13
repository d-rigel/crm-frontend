import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../../assets/img/crm.jpg";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../../../api/userApi";

export const Header = () => {
  const history = useHistory();

  const logMeOut = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("crmsite");
    userLogout();
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect bg="info" expand="md">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" with="20px" />
        </Navbar.Brand>
        <Navbar.Toggle arial-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link to="/dashboard">Dashboard</Link>
            <Link to="/Tickets">Tickets</Link>
            <Link to="/">Logout</Link> */}

            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Tickets">
              <Nav.Link>Tickets</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link onClick={logMeOut}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
