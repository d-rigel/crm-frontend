import React, { useState, useEffect } from "react";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { SearchForm } from "../../component/search-form/SearchForm.comp";
import { TicketTable } from "../../component/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummy-ticket.json";

export const TicketLists = () => {
  const [str, setStr] = useState("");
  const [dispTicket, setDispTicket] = useState(tickets);

  useEffect(() => {}, [str, dispTicket]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setStr(value);
    searchTicket(value);
    console.log(value);
  };

  const searchTicket = (sttr) => {
    const displayTickets = tickets.filter((row) =>
      row.subject.toLowerCase().includes(sttr.toLowerCase())
    );
    console.log(displayTickets);
    setDispTicket(displayTickets);
  };

  return (
    <Container>
      <Row>
        <Col>
          <BreadcrumbComp page="Ticket Lists" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="info">Add New Ticket</Button>
        </Col>
        <Col className="text-end">
          <SearchForm handleOnChange={handleOnChange} str={str} />
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <Col>
          <TicketTable tickets={dispTicket} />
        </Col>
      </Row>
    </Container>
  );
};
