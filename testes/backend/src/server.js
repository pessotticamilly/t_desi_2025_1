const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const PORT = process.env.API_PORT;

app.listen(PORT, () => {
   console.log(`Servidor rodando em \"http://localhost:${PORT}\"`); 
});