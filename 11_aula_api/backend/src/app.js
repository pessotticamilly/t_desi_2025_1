const express = require("express");
const app = express();
const produtosRoutes = require("./routes/produtosRoute");

app.use(express.json());
app.use(produtosRoutes);

module.exports = app;