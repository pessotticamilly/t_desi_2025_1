const dotenv = require("dotenv");
dotenv.config();

const crypto = require("crypto");

const ALGORITIMO = "aes-256-gcm";
const CHAVE = Buffer.from(process.env.CRYPTO_KEY, "hex");

if(CHAVE.length !== 32) {
    throw new Error("CRYPTO KEY Inválida: A chave precisa ter 32 bytes (64 carácteres)");
};

function criptografar(valor) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITIMO, CHAVE, iv);

    const valorCriptografado = Buffer.concat([cipher.update(valor, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return { iv, tag, valorCriptografado };
};

function descriptografar({ ivArmazenado, tagArmazenada, valorArmazenado }) {
    const decipher = crypto.createDecipheriv(ALGORITIMO, CHAVE, ivArmazenado);
    decipher.setAuthTag(tagArmazenada);

    const valorDescriptografado = Buffer.concat([decipher.update(valorArmazenado), decipher.final()]);

    return valorDescriptografado.toString("utf8");
};

module.exports = {
    criptografar,
    descriptografar
}