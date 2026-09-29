const db = require("../config/database");

const buscarTodos = async () => {
    const [produtos] = await db.query(
        "SELECT * FROM produtos"
    );

    return produtos;
};

const buscarPorId = async (id) => {
    const [produtos] = await db.query(
        "SELECT * FROM produtos WHERE id = ?",
        [id]
    );

    return produtos[0];
};

const criar = async (nome, marca, preco) => {
    const [resultado] = await db.query(
        "INSERT INTO produtos (nome, marca, preco) VALUES (?, ?, ?)",
        [nome, marca, preco]
    );

    return {
        id: resultado.insertId,
        nome,
        marca,
        preco
    };
};

const editar = async (id, nome, marca, preco) => {
    await db.query(
        "UPDATE produtos SET nome = ?, marca = ?, preco = ? WHERE id = ?",
        [nome, marca, preco, id]
    );

    return {
        id,
        nome,
        marca,
        preco
    };
};

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM produtos WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};