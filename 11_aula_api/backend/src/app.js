const express = require("express");
const app = express();

const produtosRoute = require("./routes/produtosRoute");
const clientesRoute = require("./routes/clientesRoute");

app.use(express.json());
app.use(produtosRoute);
app.use(clientesRoute);

module.exports = app;