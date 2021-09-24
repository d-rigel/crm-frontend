import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export const BreadcrumbComp = ({ page }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/dashboard" active>
        {page}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
