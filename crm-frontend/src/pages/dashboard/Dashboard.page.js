import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TicketTable } from "../../component/ticket-table/TicketTable.comp";
// import tickets from "../../assets/data/dummy-ticket.json";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
import { fetchAllTickets } from "../../pages/ticket-list/ticketsAction";
import { useSelector, useDispatch } from "react-redux";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  console.log(tickets);

  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);
  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  console.log(pendingTickets);
  // console.log(tickets);

  const totalTickets = tickets.length;
  // console.log(totalTickets);
  return (
    <Container>
      <Row>
        <Col>
          <BreadcrumbComp page="Dashboard" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5 mb-2">
          <Link to="/add-ticket">
            <Button
              variant="info"
              style={{ fontSize: "2rem", padding: "10px 30px" }}>
              Add New Ticket
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-2">
          <div>Total tickets: {totalTickets}</div>
          <div>Pending tickets: {pendingTickets.length}</div>
        </Col>
      </Row>
      <Row>
        <Col className=" mt-2">Recently Added tickets</Col>
      </Row>
      <hr />
      <Row>
        <Col className="recent-ticket">
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Container>
  );
};
