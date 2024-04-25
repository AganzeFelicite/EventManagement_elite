const express = require("express");
const router = express.Router();
const pool = require("../Db");
const { authenticateToken, isAdmin } = require("../middleware/authorization");
router.use(express.json());

// Route to book an event
router.post("/:eventId/book", authenticateToken, async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.userId;
  const ticketsBooked = req.body.ticketsBooked;

  try {
    // Check if the event exists
    const getEventQuery = "SELECT available_tickets FROM events WHERE id = $1";
    const getEventValues = [eventId];
    const eventResult = await pool.query(getEventQuery, getEventValues);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const availableTickets = eventResult.rows[0].available_tickets;

    // Check if there are enough available tickets
    if (ticketsBooked > availableTickets) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }

    // Insert the booking into the database
    const insertBookingQuery =
      "INSERT INTO bookings (event_id, user_id, tickets_booked) VALUES ($1, $2, $3) RETURNING *";
    const insertBookingValues = [eventId, userId, ticketsBooked];
    const insertBookingResult = await pool.query(
      insertBookingQuery,
      insertBookingValues
    );

    // Update the available tickets for the event
    const updateEventQuery =
      "UPDATE events SET available_tickets = available_tickets - $1 WHERE id = $2";
    const updateEventValues = [ticketsBooked, eventId];
    await pool.query(updateEventQuery, updateEventValues);

    res.status(201).json(insertBookingResult.rows[0]);
  } catch (err) {
    console.error("Error booking event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all bookings for the authenticated user
router.get("/all", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const getBookingsQuery =
      "SELECT b.id, e.title, e.date, b.tickets_booked FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.user_id = $1";
    const getBookingsValues = [userId];
    const bookingsResult = await pool.query(
      getBookingsQuery,
      getBookingsValues
    );

    res.json(bookingsResult.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to cancel a booking (authenticated user)
router.delete("/:bookingId", authenticateToken, async (req, res) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.userId;

  try {
    // Check if the booking exists and belongs to the authenticated user
    const getBookingQuery =
      "SELECT b.*, e.available_tickets FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.id = $1 AND b.user_id = $2";
    const getBookingValues = [bookingId, userId];
    const bookingResult = await pool.query(getBookingQuery, getBookingValues);

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = bookingResult.rows[0];
    const ticketsBooked = booking.tickets_booked;
    const eventId = booking.event_id;

    // Delete the booking from the database
    const deleteBookingQuery = "DELETE FROM bookings WHERE id = $1 RETURNING *";
    const deleteBookingValues = [bookingId];
    const deleteBookingResult = await pool.query(
      deleteBookingQuery,
      deleteBookingValues
    );

    // Update the available tickets for the event
    const updateEventQuery =
      "UPDATE events SET available_tickets = available_tickets + $1 WHERE id = $2";
    const updateEventValues = [ticketsBooked, eventId];
    await pool.query(updateEventQuery, updateEventValues);

    res.json(deleteBookingResult.rows[0]);
  } catch (err) {
    console.error("Error canceling booking:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
