const bd = require("../config/database/conexao");

async function buscarTodos() {
    const sql = `
        SELECT id, nome_completo, data_aniversario, email, telefone 
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

    return resultado;
};

async function criar({ cpf, cpfIv, cpfTag, nomeCompleto, dataAniversario, email, telefone, senhaHash, senhaSalt }) {
    const sql = `
        INSERT INTO usuarios (cpf, cpf_iv, cpf_tag, nome_completo, data_aniversario, email, telefone, senha_hash, senha_salt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [resultado] = await bd.execute(sql, [
        cpf, cpfIv, cpfTag, nomeCompleto, dataAniversario, email, telefone, senhaHash, senhaSalt
    ]);

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