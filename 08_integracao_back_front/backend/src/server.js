const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.API_PORT;

const produtosRoutes = require('./routes/produtosRoutes');

app.use(cors());
app.use(express.json());
app.use("/produtos", produtosRoutes);

app.listen(PORT, () => {
    console.log(`\nServidor Online\nRodando em \"http://localhost:${PORT}\"`);
});