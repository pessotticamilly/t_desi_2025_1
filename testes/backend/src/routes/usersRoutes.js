const express = require("express");
const router = express.Router();

const userController = require("../controllers/usersController");

router.post("/users", userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.remove);

module.exports = router;