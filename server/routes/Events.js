const express = require("express");
const router = express.Router();
const pool = require("../Db");
const { authenticateToken, isAdmin } = require("../middleware/authorization");
router.use(express.json());

// create a new event
router.post("/register", authenticateToken, isAdmin, async (req, res) => {
  const { title, description, date, location, created_by, available_tickets } =
    req.body;

  try {
    const insertEventQuery =
      "INSERT INTO events (title, description, date, location,available_tickets, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const insertEventValues = [
      title,
      description,
      date,
      location,
      available_tickets,
      created_by,
    ];
    const insertEventResult = await pool.query(
      insertEventQuery,
      insertEventValues
    );

    res.status(201).json(insertEventResult.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const getEventsQuery = "SELECT * FROM events";
    const eventsResult = await pool.query(getEventsQuery);
    res.json(eventsResult.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a specific event by ID
router.get("/:id", async (req, res) => {
  const eventId = req.params.id;

  try {
    const getEventQuery = "SELECT * FROM events WHERE id = $1";
    const getEventValues = [eventId];
    const eventResult = await pool.query(getEventQuery, getEventValues);

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(eventResult.rows[0]);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update an event (admin-only)
router.put("/update/:id", authenticateToken, isAdmin, async (req, res) => {
  const eventId = req.params.id;
  const { title, description, date, location, available_tickets } = req.body;

  try {
    const updateEventQuery =
      "UPDATE events SET title = $1, description = $2, date = $3, location = $4, available_tickets = $5 WHERE id = $6 RETURNING *";
    const updateEventValues = [
      title,
      description,
      date,
      location,
      available_tickets,
      eventId,
    ];
    const updateEventResult = await pool.query(
      updateEventQuery,
      updateEventValues
    );

    if (updateEventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updateEventResult.rows[0]);
  } catch (err) {
    console.error("Error updating event:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete an event (admin-only)
router.delete("/delete/:id", authenticateToken, isAdmin, async (req, res) => {
  const eventId = req.params.id;

  try {
    const deleteEventQuery = "DELETE FROM events WHERE id = $1 RETURNING *";
    const deleteEventValues = [eventId];
    const deleteEventResult = await pool.query(
      deleteEventQuery,
      deleteEventValues
    );

    if (deleteEventResult.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(deleteEventResult.rows[0]);
  } catch (err) {
    console.error("Error deleting event:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
