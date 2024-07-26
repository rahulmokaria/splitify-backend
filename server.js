const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

// Middleware for enabling CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route modules
const authRouter = require("./routes/auth.routes");
const friendSplitRouter = require("./routes/friend_split.routes");
const groupSplitRouter = require("./routes/group_split.routes");
const transactionRouter = require("./routes/transaction.routes");
const userRouter = require("./routes/user.routes");

// Connect to the database
require("./db/db");

// Default route for testing
app.get("/", (req, res) => {
  res.send("hello");
  console.log("device connected");
});

// Route middleware
app.use("/authApi", authRouter);
app.use("/friendSplitApi", friendSplitRouter);
app.use("/groupSplitApi", groupSplitRouter);
app.use("/transactionApi", transactionRouter);
app.use("/userApi", userRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🎉🎉🎉 listening at ${PORT}`);
});
