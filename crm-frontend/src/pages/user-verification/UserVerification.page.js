import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Jumbotron from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "./userVerification.style.css";
import { useParams } from "react-router-dom";
import { registerUserVerification } from "../../api/userApi";

export const UserVerification = () => {
  const initialResponse = {
    status: "",
    message: "",
  };

  // const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(initialResponse);

  const { _id, email } = useParams();
  const dt = { _id, email };
  console.log(dt);

  useEffect(() => {
    const apiCall = async () => {
      const result = await registerUserVerification(dt);
      setResponse(result);
      console.log(response);
    };

    !response.status && apiCall();
  }, [response]);
  return (
    <div className="registration-pagee bg-info">
      <div className="bg-light p-3 form-boxrr">
        <Container>
          <Row>
            <Col>
              {!response.status && (
                <Spinner variant="info" animation="border" />
              )}
              {response.status && (
                <Alert
                  variant={
                    response.status === "success" ? "success" : "danger"
                  }>
                  {response.message}
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
