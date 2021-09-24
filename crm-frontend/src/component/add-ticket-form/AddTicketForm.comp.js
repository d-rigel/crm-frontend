import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import "./add-ticket-form.style.css";

export const AddTicketForm = ({
  handleOnchange,
  handleOnSubmit,
  frmDt,
  frmDataError,
}) => {
  console.log(frmDt);
  return (
    <div>
      <Container className=" mb-3 bg-light add-new-ticket w-50">
        <Row>
          <h1 className="text-center text-info mt-3">Add New Ticket</h1>
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
                    value={frmDt.subject}
                    onChange={handleOnchange}
                  />
                  <Form.Text className="text-danger">
                    {frmDataError.subject && "Subject is required*"}
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
                    value={frmDt.issuedDate}
                    onChange={handleOnchange}
                  />
                </Col>
                <Form.Label>Details</Form.Label>
                <Col sm={12}>
                  <Form.Control
                    as="textarea"
                    name="detail"
                    rows="5"
                    // placeholder="write here"
                    required
                    value={frmDt.detail}
                    onChange={handleOnchange}
                  />
                </Col>
              </Form.Group>
              <Button type="submit" variant="info" className="mt-3 mb-5 w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

AddTicketForm.propTypes = {
  handleOnchange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  frmDt: PropTypes.object.isRequired,
  frmDataError: PropTypes.func.isRequired,
};
