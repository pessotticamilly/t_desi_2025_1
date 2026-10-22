const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const usuariosRoutes = require("./routes/usuariosRoutes");

app.use(express.json());
app.use("/usuarios", usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em \"http://localhost:${PORT}\"`);
});