const express = require("express");
const app = express();

const produtosRoute = require("./routes/produtosRoute");

app.use(express.json());
app.use(produtosRoute);

module.exports = app;