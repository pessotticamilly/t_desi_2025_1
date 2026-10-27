require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3033;

const productsRoutes = require("./routes/productsRoutes");

app.use(express.json());

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "API Organiza Comercial",
    rotaProdutos: "/api/produtos"
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found" 
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: "Internal Error" 
  });
});

app.listen(PORT, () => {
  console.log(`API running in http://localhost:${PORT}`);
});
