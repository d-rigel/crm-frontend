import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
// import { reqPasswordOtp } from "../../api/passwordApi"
import { sendPasswordResetOtp } from "./passwordAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { isLoading, status, message } = useSelector((state) => state.password);
  const dispatch = useDispatch();
  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    console.log("form submit", email);
    dispatch(sendPasswordResetOtp(email));
  };

  const handleOnchange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            {message && (
              <Alert variant={status === "success" ? "success" : "danger"}>
                {message}
              </Alert>
            )}
            {isLoading && <Spinner variant="info" animation="border"></Spinner>}
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h1 className="text-info text-center">Reset Password</h1>
            <hr />
            <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
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
              <Button type="submit" className="mt-3">
                Reset Password
              </Button>
            </Form>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="/">Login Now</a>
          </Col>
          {/* <Col>
            <a href="#!" onClick={() => formSwitcher("login")}>
              Login Now
            </a>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

// ResetPassword.propTypes = {
//   handleOnchange: PropTypes.func.isRequired,
//   handleOnResetSubmit: PropTypes.func.isRequired,
//   formSwitcher: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
// };
//...........................................................................................

// import React from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import PropTypes from "prop-types";

// export const ResetPassword = ({
//   handleOnchange,
//   email,
//   handleOnResetSubmit,
//   formSwitcher,
// }) => {
//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col sm={12}>
//             <h1 className="text-info text-center">Reset Password</h1>
//             <hr />
//             <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
//               <Form.Group>
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email"
//                   // required
//                   value={email}
//                   onChange={handleOnchange}
//                 />
//               </Form.Group>
//               <Button type="submit" className="mt-3">
//                 Reset Password
//               </Button>
//             </Form>
//             <hr />
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <a href="#!" onClick={() => formSwitcher("login")}>
//               Login Now
//             </a>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// ResetPassword.propTypes = {
//   handleOnchange: PropTypes.func.isRequired,
//   handleOnResetSubmit: PropTypes.func.isRequired,
//   formSwitcher: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
// };
