const express = require("express");
const router = express.Router();
const { insertTicket, getTickets } = require("../model/ticket/Ticket.model");
const {
  UserAuthorization,
} = require("../middlewares/authorization.middleware");

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

//Create a ticket
router.post("/", UserAuthorization, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;
    // console.log(req);
    const userId = req.userId;

    const ticketObj = {
      clientId: userId,
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

//Get all ticket for a specific user
router.get("/", UserAuthorization, async (req, res) => {
  try {
    // console.log(req);
    const userId = req.userId;

    const result = await getTickets(userId);
    console.log(result);

    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
