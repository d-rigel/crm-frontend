import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { filterSearchTicket } from "../../pages/ticket-list/ticketsAction";

export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterSearchTicket(value));
  };
  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Search:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="searchStr"
              placeholder="Search ..."
              // value={str}
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

// SearchForm.propTypes = {
//   handleOnChange: PropTypes.func.isRequired,
//   str: PropTypes.string.isRequired,
// };
