const dotenv = require("dotenv");
dotenv.config();

const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.CRYPTO_KEY ?? "", "hex");

if (KEY.length !== 32) {
    throw new Error("Invalid CRYPTO_KEY: Its need to has 32 bytes (64 hex caracters)");
}

function encrypt(value) {
    const iv = crypto.randomBytes(12); // vetor de inicialização - valor aleatório gerado a cada criptografia, é ele que faz o mesmo cpf produzir resultados diferentes toda vez
    // para o algoritimo, ele precisa ser em bytes (um Buffer), por isso não usa o "hex", só na hora de guardar
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encryptedValue = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag(); // selo gcm de autenticidade, precisa dele para descriptografar pois prova duas coisas: o dado não foi alterado e foi criptografado com a nossa chave

    return { iv, tag, encryptedValue };

    // Bytes para trabalhar, hex para guardar
};
function decrypt({ storedIv, storedTag, storedValue }) {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, storedIv);
    decipher.setAuthTag(storedTag);

    const decryptedValue = Buffer.concat([decipher.update(storedValue), decipher.final()]);
    
    return decryptedValue.toString("utf8");
};

module.exports = {
    encrypt,
    decrypt
};