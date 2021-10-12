import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import { loginPending, loginSuccess, loginFail } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../api/userApi";
import { useHistory } from "react-router-dom";

export const LoginForm = ({ formSwitcher }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const history = useHistory();
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
    // console.log(name, value, "welcome");
  };

  // const handleOnSubmit = (e) => {

  //   e.preventDefault();
  //   if (!email || !password) {
  //     return alert("please fill all boxes!");
  //   }
  //   if (password.length < 5) {
  //     return alert("short password!");
  //   }

  //   //TODO: call api to submit the form
  //   console.log("Email: ", email, "Password:", password);
  // };

  const handleOnSubmit = async (e) => {
    // const { email, password } = e.target;
    e.preventDefault();
    if (!email || !password) {
      return alert("please fill all boxes!");
    }
    // if (password.length < 5) {
    //   return alert("short password!");
    // }
    dispatch(loginPending());
    try {
      const isAuth = await userLogin({ email, password });
      console.log(isAuth);

      if (isAuth.status === "error") {
        //store error message in state
        return dispatch(loginFail(isAuth.message));
      }

      dispatch(loginSuccess());
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
      dispatch(loginFail(error.message));
    }

    //TODO: call api to submit the form
    // console.log("Email: ", email, "Password:", password);
  };

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return alert("please input email!!!");
    }
    console.log(email);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className="text-info text-center">Client Login</h1>
            <hr />
            {error && <Alert variant="danger">{error} </Alert>}
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={handleOnchange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={handleOnchange}
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Login
              </Button>
              {isLoading && <Spinner variant="primary" animation="border" />}
            </Form>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="#!" onClick={() => formSwitcher("reset")}>
              Forget Password?
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LoginForm.propTypes = {
  // handleOnchange: PropTypes.func.isRequired,
  formSwitcher: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  // handleOnSubmit: PropTypes.func.isRequired,
};
