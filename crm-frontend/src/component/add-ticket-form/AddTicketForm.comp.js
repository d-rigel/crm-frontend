import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import PropTypes from "prop-types";
import "./add-ticket-form.style.css";
import { shortText } from "../../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import { openNewTicket } from "./addTicketAction";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "react-bootstrap";
import { resetSuccessMsg } from "./addTicketSlice";

export const AddTicketForm = () => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, successMsg, error } = useSelector(
    (state) => state.openTicket
  );

  const initialFrmDt = {
    subject: "",
    issuedDate: "",
    message: "",
  };

  const initialFrmError = {
    subject: false,
    issuedDate: false,
    message: false,
  };
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      //using as a component unmount i.e running a cleanup
      successMsg && dispatch(resetSuccessMsg());
    };
  }, [frmData, frmDataError, dispatch]);

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
    // console.log(name, value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmDataError(initialFrmError);

    const isSubjectValid = await shortText(frmData.subject);

    setFrmDataError({
      ...initialFrmError,
      subject: !isSubjectValid,
    });
    // console.log("Click to submit", frmData);
    dispatch(openNewTicket({ ...frmData, sender: name }));
  };
  return (
    <div>
      <Container className=" mb-3 mt-3 bg-light add-new-ticket w-50">
        <Row>
          <h1 className="text-center text-info mt-3">Add New Ticket</h1>
          <hr />

          <div>
            {isLoading && <Spinner variant="primary" animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {successMsg && (
              <Alert variant="success">{successMsg.message}</Alert>
            )}
          </div>

          <Col sm={12}>
            <Form autoComplete="off" onSubmit={handleOnSubmit}>
              <Form.Group as={Row} className="mt-5">
                <Form.Label column sm={3}>
                  Subject
                </Form.Label>
                <Col sm={9} className="mb-3">
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    // minLength="3"
                    maxLength="50"
                    required
                    value={frmData.subject}
                    onChange={handleOnchange}
                  />
                  <Form.Text className="text-danger">
                    {frmDataError.subject && "Subject is required!"}
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Issue Found At
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="date"
                    name="issuedDate"
                    placeholder="Enter Issue"
                    required
                    value={frmData.issuedDate}
                    onChange={handleOnchange}
                  />
                </Col>
                <Form.Label>Details</Form.Label>
                <Col sm={12}>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows="5"
                    // placeholder="write here"
                    required
                    value={frmData.message}
                    onChange={handleOnchange}
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="info" className="mt-3 mb-5 w-100">
                Open Ticket
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// AddTicketForm.propTypes = {
//   handleOnchange: PropTypes.func.isRequired,
//   handleOnSubmit: PropTypes.func.isRequired,
//   frmDt: PropTypes.object.isRequired,
//   frmDataError: PropTypes.func.isRequired,
// };
