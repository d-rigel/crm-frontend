import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Jumbotron from "react-bootstrap/Jumbotron";
import "./registration.style.css";
import { RegistrationForm } from "../../component/registration-form/RegistrationForm.comp";

export const Registration = () => {
  return (
    <div className="registration-page bg-info">
      <div className="bg-light p-3 form-boxr">
        <Container>
          <Row>
            <Col>
              <RegistrationForm />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
