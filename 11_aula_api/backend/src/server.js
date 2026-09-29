
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.API_PORT || 3033;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}\nhttp://localhost:${PORT}`);
});