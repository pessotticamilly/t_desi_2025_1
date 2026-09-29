const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

router.get("/clientes", clientesController.buscarProduto);
router.get("/clientes/:id", clientesController.buscarProdutoPorId);
router.post("/clientes", clientesController.criarProduto);
router.put("/clientes/:id", clientesController.editarProduto);
router.delete("/clientes/:id", clientesController.excluirProduto);

module.exports = router;