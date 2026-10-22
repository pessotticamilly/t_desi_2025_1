const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.buscarTodos);
router.get("/:id", usuariosController.buscarPorId);
router.post("/", usuariosController.criar);
router.put("/:id", usuariosController.editar);
router.delete("/:id", usuariosController.excluir);

module.exports = router;