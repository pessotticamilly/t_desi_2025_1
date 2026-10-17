const db = require("../config/database/connection");

async function create({ cpf, cpfIv, cpfTag, fullName, birthDate, email, phoneNumber, passwordSalt, passwordHash }) {
    const sql = `
        INSERT INTO users
        (cpf, cpf_iv, cpf_tag, full_name, birth_date, email, phone_number, password_salt, password_hash)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await db.execute(sql, [
        cpf, cpfIv, cpfTag, fullName, birthDate, email, phoneNumber, passwordSalt, passwordHash,
    ]);

    return result.insertId;
}

// Na listagem não trazemos CPF nem dados de senha
async function findAll() {
    const sql = `SELECT id, full_name, birth_date, email, phone_number FROM users`;
    const [rows] = await db.execute(sql);

    return rows;
}

// Traz o CPF cifrado (com iv e tag) para o controller poder descriptografar
async function findById(id) {
    const sql = `
        SELECT id, cpf, cpf_iv, cpf_tag, full_name, birth_date, email, phone_number
        FROM users
        WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);

    return rows[0]; // undefined se não existir
}

async function update(id, { cpf, cpfIv, cpfTag, fullName, birthDate, email, phoneNumber }) {
    const sql = `
        UPDATE users
        SET cpf = ?, cpf_iv = ?, cpf_tag = ?, full_name = ?, birth_date = ?, email = ?, phone_number = ?
        WHERE id = ?`;

    const [result] = await db.execute(sql, [
        cpf, cpfIv, cpfTag, fullName, birthDate, email, phoneNumber, id,
    ]);

    return result.affectedRows;
}

async function remove(id) {
    const [result] = await db.execute(`DELETE FROM users WHERE id = ?`, [id]);

    return result.affectedRows;
}

module.exports = { create, findAll, findById, update, remove };