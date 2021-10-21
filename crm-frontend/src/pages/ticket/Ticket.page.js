import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
// import tickets from "../../assets/data/dummy-ticket.json";
import { MessageHistory } from "../../component/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../component/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import {
  fetchSingleTicket,
  closeTicket,
} from "../../pages/ticket-list/ticketsAction";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

// const ticket = tickets[0];
export const Ticket = () => {
  const { tId } = useParams();
  // const [message, setMessage] = useState("");
  // const [ticket, setTicket] = useState("");
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, replyMsg } = useSelector(
    (state) => state.tickets
  );
  // const { replyMsg } = useSelector((state) => state.tickets);

  // useEffect(() => {
  //   for (let index = 0; index < tickets.length; index++) {
  //     if (tickets[index].id === tId) {
  //       setTicket(tickets[index]);
  //       continue;
  //     }
  //     // const element = array[index];
  //   }
  // }, [message, tId]);

  useEffect(() => {
    dispatch(fetchSingleTicket(tId));
  }, [tId, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <BreadcrumbComp page="Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <Spinner variant="primary" animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
        </Col>
      </Row>
      <Row>
        <Col className="text-weight-bolder text-secondary">
          <div className="subject">subject: {selectedTicket.subject}</div>
          <div className="date">
            Ticket Opened:{" "}
            {selectedTicket.openAt &&
              new Date(selectedTicket.openAt).toLocaleString()}
          </div>
          <div className="status">status: {selectedTicket.status}</div>
          {/* <div className="subject">subject: {ticket.subject}</div>
          <div className="date">Ticket Opened: {ticket.addedAt}</div>
          <div className="status">status: {ticket.status}</div> */}
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-info"
            onClick={() => dispatch(closeTicket(tId))}
            disabled={selectedTicket.status === "Closed"}>
            Close Ticket
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {/* {ticket.history && <MessageHistory msg={ticket.history} />} */}
        {selectedTicket.conversations && (
          <MessageHistory msg={selectedTicket.conversations} />
        )}
      </Row>
      <hr />

      <Row className="mt-4">
        <UpdateTicket _id={tId} />
        {/* <UpdateTicket
          msg={message}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        /> */}
      </Row>
    </Container>
  );
};
