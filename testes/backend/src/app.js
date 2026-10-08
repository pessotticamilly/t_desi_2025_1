const express = require("express");
const app = express();

const userRoutes = require("./routes/usersRoutes");

app.use(express.json());

app.use(userRoutes);

module.exports = app;