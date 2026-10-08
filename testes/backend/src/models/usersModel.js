const database = require("../config/database/connection");

// cpf, full_name, birth_date, email, phone_number, password

const getAllUsers = async () => {
    const [users] = await database.query(
        `SELECT * 
        FROM users`
    );

    return users;
};

const getUserById = async (id) => {
    const [user] = await database.query(
        `SELECT * 
        FROM users WHERE id = ?`,
        [id]
    );

    return user;
};

const createUser = async (cpf, full_name, birth_date, email, phone_number, password) => {
    const [user] = await database.query(
        `INSERT INTO users (cpf, full_name, birth_date, email, phone_number, password)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [cpf, full_name, birth_date, email, phone_number, password]
    );

    return {
        id: user.insertId,
        cpf,
        full_name,
        birth_date,
        email,
        phone_number,
        password
    };
};

const updateUser = async (id, cpf, full_name, birth_date, email, phone_number, password) => {
    const [user] = await database.query(
        `UPDATE users 
        SET cpf = ?, full_name = ?, birth_date = ?, email = ?, phone_number = ?, password = ?
        WHERE id = ?`,
        [cpf, full_name, birth_date, email, phone_number, password, id]
    );

    return {
        id,
        cpf,
        full_name,
        birth_date,
        email,
        phone_number,
        password
    };
};

const deleteUser = async (id) => {
    const [result] = await database.query(
        `DELETE FROM users
        WHERE id = ?`,
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};