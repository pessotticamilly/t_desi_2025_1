const bd = require("../config/database/conexao");

async function buscarTodos() {
    const sql = `
        SELECT * 
        FROM usuarios;
    `;
    const [resultado] = await bd.execute(sql);

    return resultado;
};

async function buscarPorId(id) {
    const sql = `
        SELECT * 
        FROM usuarios 
        WHERE id = ?;
    `;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado[0];
};

async function criar({ cpf, cpfIv, cpfTag, nomeCompleto, dataNascimento, email, telefone, senhaHash, senhaSalt }) {
    const sql = `
        INSERT INTO usuarios (cpf, cpfIv, cpfTag, nomeCompleto, dataNascimento, email, telefone, senhaHash, senhaSalt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [resultado] = await bd.execute(sql, [cpf, cpfIv, cpfTag, nomeCompleto, dataNascimento, email, telefone, senhaHash, senhaSalt]);

    return resultado;
};

async function editar(id, dados) {
    const camposPermitidos = [
        "cpf", 
        "cpfIv", 
        "cpfTag", 
        "nomeCompleto", 
        "dataAniversario", 
        "email", 
        "telefone", 
        "senhaHash", 
        "senhaSalt"
    ];
    const campos = Object.keys(dados);
    
    // campos.some() --> verifica se pelo menos UM campo atende x condição
    // camposPermitidos.includes(campo) --> verifica se o campo existe na lista
    // ! --> valor invertido
    if(campos.length === 0 || campos.some(campo => !camposPermitidos.includes(campo))) {
        throw new Error("Variáveis de atualização inválidos");
    };

    const atribuicoes = campos.map(campo => `\'${campo}\' = ?`).join(", ");
    const valores = campos.map(campo => dados[campo]);
    const sql = `
        UPDATE usuarios
        SET ${atribuicoes}
        WHERE id = ?;
    `;
    // spread operator
    const [resultado] = await bd.execute(sql, [...valores, id]);

    return resultado;
};

async function excluir(id) {
    const sql = `
        DELETE FROM usuarios 
        WHERE id = ?;
    `;
    const [resultado] = await bd.execute(sql, [id]);

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};