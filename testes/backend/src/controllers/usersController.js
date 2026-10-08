const usersModel = require("../models/usersModel");

const getAllUsers = async (req, res) => {
    const users = await usersModel.getAllUsers();

    res.json(users);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersModel.getUserById(id);

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    };

    res.json(user);
};

const createUser = async (req, res) => {
    const { cpf, full_name, birth_date, email, phone_number, password } = req.body;
    const newUser = await usersModel.createUser(cpf, full_name, birth_date, email, phone_number, password);

    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const user = await usersModel.getUserById(id);

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    };
    
    const { cpf, full_name, birth_date, email, phone_number, password } = req.body;
    const updatedUser = await usersModel.updateUser(id, cpf, full_name, birth_date, email, phone_number, password);

    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await usersModel.getUserById(id);

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        });
    };

    await usersModel.deleteUser(id);

    res.json({
        message: "User deleted successfully"
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};