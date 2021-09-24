import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BreadcrumbComp } from "../../component/breadcrumb/Breadcrumb.comp";
import { AddTicketForm } from "../../component/add-ticket-form/AddTicketForm.comp";
import { shortText } from "../../utils/validation";

const initialFrmDt = {
  subject: "",
  issuedDate: "",
  detail: "",
};

const initialFrmError = {
  subject: false,
  issuedDate: false,
  detail: false,
};

export const AddTicket = () => {
  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataError, setFrmDataError] = useState(initialFrmError);

  useEffect(() => {}, [frmData, frmDataError]);

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
    // console.log(name, value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmDataError(initialFrmError);

    const isSubjectValid = await shortText(frmData.subject);

    setFrmDataError({
      ...initialFrmError,
      subject: !isSubjectValid,
    });
    console.log("Click to submit", frmData);

    setFrmData(initialFrmDt);
  };

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <BreadcrumbComp page="New Ticket" />
        </Col>
      </Row>
      <Row>
        <Col>
          <AddTicketForm
            handleOnchange={handleOnchange}
            handleOnSubmit={handleOnSubmit}
            frmDt={frmData}
            frmDataError={frmDataError}
          />
        </Col>
      </Row>
    </Container>
  );
};
