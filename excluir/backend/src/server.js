const express = require("express");
const app = express();
const PORT = 3033;

const produtosRoute = require("./routes/produtosRoute");
const clientesRoute = require("./routes/clientesRoute");

app.use(express.json());
app.use(produtosRoute);
app.use(clientesRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}\nhttp://localhost:${PORT}`)
});