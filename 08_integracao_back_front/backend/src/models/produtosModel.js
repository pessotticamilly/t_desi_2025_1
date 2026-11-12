const bd = require('../config/database/conexao');

async function buscarTodosProdutos() {
    const sql = `
        SELECT *
        FROM produtos;
    `;
    const [resultado] = await bd.execute(sql);

    return resultado;
};

async function buscarProdutoPorId(id) {
    const sql = `
        SELECT *
        FROM produtos
        WHERE id = ?;
    `;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado;
};

async function criarProduto(nome, descricao, preco) {
    const sql = `
        INSERT INTO produtos (nome, descricao, preco)
        VALUES (?, ?, ?);
    `;
    const [resultado] = await bd.execute(sql, [nome, descricao, preco]);

    return resultado;
};

async function editarProduto(id, nome, descricao, preco) {
    const sql = `
        UPDATE produtos
        SET nome = ?, descricao = ?, preco = ?
        WHERE id = ?;
    `;
    const [resultado] = await bd.execute(sql, [nome, descricao, preco, id]);

    return resultado;
};

async function excluirProduto(id) {
    const sql = `
        DELETE FROM produtos
        WHERE id = ?;
    `;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado;
};

module.exports = {
    buscarTodosProdutos,
    buscarProdutoPorId,
    criarProduto,
    editarProduto,
    excluirProduto
};