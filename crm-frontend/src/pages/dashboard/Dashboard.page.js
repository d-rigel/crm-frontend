import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TicketTable } from "../../component/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummy-ticket.json";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import { Link } from "react-router-dom";
export const Dashboard = () => {
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
          <div>Total tickets: 50</div>
          <div>Pending tickets: 5</div>
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
