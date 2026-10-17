const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const PORT = process.env.API_PORT;

const userRoutes = require("./routes/usersRoutes");

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
   console.log(`Servidor rodando em \"http://localhost:${PORT}\"`); 
});