import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import tickets from "../../assets/data/dummy-ticket.json";
import { MessageHistory } from "../../component/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../component/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";

// const ticket = tickets[0];
export const Ticket = () => {
  const { tId } = useParams();
  const [message, setMessage] = useState("");
  const [ticket, setTicket] = useState("");
  useEffect(() => {
    for (let index = 0; index < tickets.length; index++) {
      if (tickets[index].id === tId) {
        setTicket(tickets[index]);
        continue;
      }
      // const element = array[index];
    }
  }, [message, tId]);

  const handleOnChange = (e) => {
    // const { name, value } = e.target;
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    alert("form submitted");
  };
  return (
    <Container>
      <Row>
        <Col>
          <BreadcrumbComp page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">subject: {ticket.subject}</div>
          <div className="date">Ticket Opened: {ticket.addedAt}</div>
          <div className="status">status: {ticket.status}</div>
        </Col>
        <Col className="text-end">
          <Button variant="outline-info">Close Ticket</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {ticket.history && <MessageHistory msg={ticket.history} />}
      </Row>
      <hr />

      <Row className="mt-4">
        <UpdateTicket
          msg={message}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        />
      </Row>
    </Container>
  );
};
