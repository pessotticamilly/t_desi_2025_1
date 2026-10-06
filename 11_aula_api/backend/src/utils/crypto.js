const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const KEY = "aaaabbbbccccddddeeeeffffgggghhhh" // Buffer.from(process.env.CRYPTO_KEY, "hex"); // mínimo 32 caracteres

function hash(value) {

}

function encrypt(value) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    let encrypted_value = cipher.update(value, "utf8", "hex");
    encrypted_value += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
        iv: iv.toString("hex"),
        encrypted_value: encrypted_value,
        authTag: authTag.toString("hex")
    };
}

function decrypt(value) {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(value.iv, "hex"));
    decipher.setAuthTag(Buffer.from(value.authTag, "hex"));

    let decrypted_value = decipher.update(value.content, "hex", "utf8");
    decrypted_value += decipher.final("utf8");

    return decrypted_value;
}

/* console.log(encrypt("11472601920"))
console.log(
    decrypt({
        iv: 'a24eaabfd7c4843fec24702d8031047b',
        content: 'd05ace127524de63d7df42',
        authTag: '659376aa4a19305e4e7bf68ee99c3c2a'
    })
) */

module.exports = {
    encrypt,
    decrypt
};