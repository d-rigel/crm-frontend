const express = require("express");
const router = express.Router();
const { insertTicket } = require("../model/ticket/Ticket.model");

//Workflow
// - create url endpoints
// - receive new ticket data
// - Authorize every request with jwt
// - insert in mongodb
// - Retrive all the ticket for the specific user
// - Retrive a ticket from mongodb
// - Update message conversation in the ticket database
// - update ticket status // close, operator responsive pending, client response pending
// - delete ticket from mongodb

// router.all("/", (req, res, next) => {
//   res.json({ message: "return form ticket router" });
// });

router.post("/", async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    // console.log(req.body);

    const ticketObj = {
      clientId: "615e0ba1d2c64cd3f97dbc64",
      subject,
      conversations: [
        {
          sender,
          message,
        },
      ],
    };

    const result = await insertTicket(ticketObj);
    if (result._id) {
      return res.json({
        status: "success",
        message: "new ticket has been created",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create the ticket, please try again later",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
