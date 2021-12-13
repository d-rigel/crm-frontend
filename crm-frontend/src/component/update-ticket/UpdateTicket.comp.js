import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { replyOnTicket } from "../../pages/ticket-list/ticketsAction";

// export const UpdateTicket = ({ msg, handleOnChange, handleOnSubmit }) => {
export const UpdateTicket = ({ _id }) => {
  const [message, setMessage] = useState("");
  console.log(message);
  const {
    user: { name },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    // const { name, value } = e.target;
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const msgObj = {
      message,
      sender: name,
    };
    console.log(msgObj);
    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };
  return (
    <Row>
      <Form onSubmit={handleOnSubmit}>
        <Form.Label>Reply</Form.Label>
        <Col>
          <Form.Text>
            Please reply your message here or update the ticket.
          </Form.Text>
        </Col>
        <Form.Control
          as="textarea"
          rows="5"
          name="detail"
          value={message}
          onChange={handleOnChange}
        />
        <div className="text-end mt-3 mb-3">
          <Button variant="info" type="submit">
            Reply
          </Button>
        </div>
      </Form>
    </Row>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
  // msg: PropTypes.string.isRequired,
  // handleOnChange: PropTypes.func.isRequired,
  // handleOnSubmit: PropTypes.func.isRequired,
};
