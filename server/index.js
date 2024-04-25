require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const userRouter = require("./routes/Users");
const eventRoutes = require("./routes/Events");
const bookingRoutes = require("./routes/Booking");
app.use(cors());
app.use(express.json());

app.use("/booking", bookingRoutes);
app.use("/user", userRouter);
app.use("/event", eventRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
