const crypto = require("crypto");

// Configuração para usar de maneira assíncrona
const { promisify } = require("util"); // nativo do Node.js
const scrypt = promisify(crypto.scrypt);

async function gerarHashSenha(senha) {
    const salt = crypto.randomBytes(16);
    const hash = await scrypt(senha, salt, 64);

    return { salt, hash };
};

async function verificarHashSenha(senha, { saltArmazenado, hashSenhaArmazenado }) {
    const novoHash = await scrypt(senha, saltArmazenado, 64);
    return crypto.timingSafeEqual(hashSenhaArmazenado, novoHash);
};

module.exports = {
    gerarHashSenha,
    verificarHashSenha
};