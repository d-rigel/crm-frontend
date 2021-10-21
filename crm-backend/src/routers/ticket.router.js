const express = require("express");
const router = express.Router();
const {
  insertTicket,
  getTickets,
  getTicketById,
  updateClientReply,
  updateStatusClose,
  deleteTicket,
} = require("../model/ticket/Ticket.model");
const {
  UserAuthorization,
} = require("../middlewares/authorization.middleware");
const {
  createNewTicketValidation,
  replyTicketMessageValidation,
} = require("../middlewares/formValidation.middleware");

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
router.post(
  "/",
  createNewTicketValidation,
  UserAuthorization,

  async (req, res) => {
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
  }
);

//Get all ticket for a specific user
router.get("/", UserAuthorization, async (req, res) => {
  try {
    // console.log(req);
    const userId = req.userId;

    const result = await getTickets(userId);
    // console.log(result);

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

//Get all ticket for a specific user
router.get("/:ticketId", UserAuthorization, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const clientId = req.userId;
    console.log(req);

    const result = await getTicketById(ticketId, clientId);
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

//Update reply message from client
router.put(
  "/:ticketId",
  replyTicketMessageValidation,
  UserAuthorization,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { ticketId } = req.params;
      // const clientId = req.userId

      const result = await updateClientReply(ticketId, message, sender);
      console.log(result);
      if (result._id) {
        return res.json({
          status: "success",
          message: "Your message updated",
        });
      }
      return res.json({
        status: "error",
        message: "Unable to update your message, please try again later",
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  }
);

//Update reply message from client
router.patch("/close-ticket/:ticketId", UserAuthorization, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const clientId = req.userId;

    const result = await updateStatusClose(ticketId, clientId);

    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }
    return res.json({
      status: "error",
      message: "Unable to update the ticket",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

//Delete ticket
//Update reply message from client
router.delete("/:ticketId", UserAuthorization, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const clientId = req.userId;

    const result = await deleteTicket(ticketId, clientId);

    if (result._id) {
      return res.json({
        status: "success",
        message: "ticket deleted",
      });
    }
    return res.json({
      status: "error",
      message: "Unable to delete ticket",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
