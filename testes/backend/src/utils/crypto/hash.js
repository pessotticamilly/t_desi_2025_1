const crypto = require("crypto");

// configuração para versão assíncrona - para não travar nossa API
const { promisify } = require("util");
const scrypt = promisify(crypto.scrypt);

// HASH
// criptografia de "mão única": uma string gera um hash, mas um hash não gera uma string
async function generatePasswordHash(password) {
    const salt = crypto.randomBytes(16);    
    const hash = await scrypt(password, salt, 64);

    return { salt, hash };
};

async function verifyPassword(password, { storedSalt, storedHas }) {
    const newHash = await scrypt(password, storedSalt, 64);

    return crypto.timingSafeEqual(storedHash, newHash);
    // Buffer é a classe do Node para representar dados binários crus (uma sequência de bytes)
    // Buffer.from() cria Buffers a partir de algum dado já existente no código em string, array, etc - o "hex" informa como interpretar esse dado
    // timingSafeEqual compara dois buffers
};

module.exports = {
    generatePasswordHash,
    verifyPassword
};