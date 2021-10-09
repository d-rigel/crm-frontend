import React, { useEffect } from "react";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { SearchForm } from "../../component/search-form/SearchForm.comp";
import { TicketTable } from "../../component/ticket-table/TicketTable.comp";
// import tickets from "../../assets/data/dummy-ticket.json";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";

export const TicketLists = () => {
  const dispatch = useDispatch();
  // const [str, setStr] = useState("");
  // const [dispTicket, setDispTicket] = useState(tickets);

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  // const handleOnChange = (e) => {
  //   const { value } = e.target;
  //   setStr(value);
  //   searchTicket(value);
  //   // console.log(value);
  // };

  // const searchTicket = (sttr) => {
  //   const displayTickets = tickets.filter((row) =>
  //     row.subject.toLowerCase().includes(sttr.toLowerCase())
  //   );

  // console.log(displayTickets);
  // setDispTicket(displayTickets);
  // };

  return (
    <Container>
      <Row>
        <Col>
          <BreadcrumbComp page="Ticket Lists" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link to="/add-ticket">
            <Button variant="info">Add New Ticket</Button>
          </Link>
        </Col>
        <Col className="text-end">
          <SearchForm />
          {/* <SearchForm handleOnChange={handleOnChange} str={str} /> */}
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <Col>
          <TicketTable />
        </Col>
      </Row>
    </Container>
  );
};
