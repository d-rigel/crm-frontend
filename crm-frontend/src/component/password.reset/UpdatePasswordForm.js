import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
// import { userRegistration } from "./regUserAction";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./passwordAction";

const initialState = {
  pin: "",
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

export const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState(initialState);
  console.log(newPassword);
  const [passwordError, setPasswordError] = useState(passVerificationError);

  const { isLoading, status, message, email } = useSelector(
    (state) => state.password
  );

  useEffect(() => {}, [newPassword]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });

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
        confirmPass: newPassword.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { pin, password } = newPassword;

    const newPassObj = {
      pin,
      newPassword: password,
      email,
    };
    dispatch(updatePassword(newPassObj));
    console.log(pin, password);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className=" mb-3 mt-3  text-info">Update Password</h2>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {status === "success" && <Alert variant="success">{message}</Alert>}
          {status === "error" && <Alert variant="danger">{message}</Alert>}
          {isLoading && <Spinner variant="info" animation="border"></Spinner>}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-1">
              <Form.Label>Pin</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                value={newPassword.pin}
                onChange={handleOnChange}
                placeholder="OTP"
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={newPassword.confirmPass}
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
