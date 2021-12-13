import React from "react";
import PropTypes from "prop-types";
import "./message-history.style.css";

export const MessageHistory = ({ msg }) => {
  console.log(msg);
  if (!msg) return null;
  return msg.map((row, i) => (
    <div key={i} className="message-history mt-3">
      <div className="send  text-secondary">
        <div className="sender fw-bold">{row.sender}</div>
        <div className="date">
          {row.msgAt && new Date(row.msgAt).toLocaleString()}
        </div>
      </div>
      <div className="message">{row.message}</div>
    </div>
  ));
};

MessageHistory.propTypes = {
  msg: PropTypes.array.isRequired,
};
