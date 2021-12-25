import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { userRegistration } from "./regUserAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "Dev Emmanuel",
  phone: "0503218493",
  email: "alozie4God@gmail.com",
  company: "dev-rigel",
  address: "#12 sam st.",
  password: "@Password12",
  confirmPass: "@Password12",
};

const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpeclChr: false,
  confirmPass: false,
};

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);

  const { isLoading, status, message } = useSelector(
    (state) => state.registration
  );

  useEffect(() => {}, [newUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpeclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passVerificationError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpeclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, company, address, password } = newUser;

    const newRegistration = { name, phone, email, company, address, password };
    console.log(newUser);
    dispatch(userRegistration(newRegistration));
  };

  //Connect user regitration form to backend REST API and manage network state with Redux Toolkit
  //email user to a link to verify their email
  //create frontend page to handle the email verification that client receives in their email

  return (
    <Container>
      <Row>
        <Col>
          <h2 className=" mb-3 mt-3  text-info">User Registration</h2>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {status === "success" && <Alert variant="success">{message}</Alert>}
          {status === "error" && <Alert variant="danger">{message}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleOnChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={newUser.phone}
                onChange={handleOnChange}
                placeholder="Enter Phone"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleOnChange}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newUser.company}
                onChange={handleOnChange}
                placeholder="Enter company"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newUser.address}
                onChange={handleOnChange}
                placeholder="Full address"
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={newUser.confirmPass}
                onChange={handleOnChange}
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Form.Text>
              {!passwordError.confirmPass && (
                <div className="text-danger mb-2">Password does not match!</div>
              )}
            </Form.Text>

            <ul className="mb-4">
              <li
                className={
                  passwordError.isLenthy ? "text-success" : "text-danger"
                }>
                Min 8 character
              </li>
              <li
                className={
                  passwordError.hasUpper ? "text-success" : "text-danger"
                }>
                At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower ? "text-success" : "text-danger"
                }>
                At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-success" : "text-danger"
                }>
                At least one number
              </li>
              <li
                className={
                  passwordError.hasSpeclChr ? "text-success" : "text-danger"
                }>
                At least one of the special characters i.e @#$%&...
              </li>
            </ul>

            <Button
              variant="primary"
              type="submit"
              disabled={Object.values(passwordError).includes(false)}>
              Submit
            </Button>
            {isLoading && <Spinner variant="info" animation="border"></Spinner>}
          </Form>
        </Col>
        <Row className="py-2">
          <Col>
            Already have an account? {""}
            <a href="/">Login Now</a>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};
