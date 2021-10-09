import React from "react";
import Table from "react-bootstrap/Table";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const TicketTable = () => {
  // const { tickets, isLoading, error } = useSelector((state) => state.tickets);
  const { searchTicketList, isLoading, error } = useSelector(
    (state) => state.tickets
  );
  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Subjects</th>
          <th>Status</th>
          <th>Opened date</th>
        </tr>
      </thead>
      <tbody>
        {searchTicketList.length ? (
          searchTicketList.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>
                <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
              </td>
              <td>{row.status}</td>
              <td>{row.openAt}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No Ticket to show
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

// TicketTable.propTypes = {
//   tickets: PropTypes.array.isRequired,
// };
