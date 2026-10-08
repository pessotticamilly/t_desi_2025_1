const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

router.get("/produtos", produtosController.buscarProduto);
router.get("/produtos/:id", produtosController.buscarProdutoPorId);
router.post("/produtos", produtosController.criarProduto);
router.put("/produtos/:id", produtosController.editarProduto);
router.delete("/produtos/:id", produtosController.excluirProduto);

module.exports = router;