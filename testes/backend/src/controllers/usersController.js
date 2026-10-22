const userModel = require("../models/usersModel");
const { generatePasswordHash } = require("../utils/crypto/hash");
const { encrypt, decrypt } = require("../utils/crypto/encryption");

// e-mail ou telefone repetidos (colunas UNIQUE)
function isDuplicateError(error) {
    return error.code === "ER_DUP_ENTRY";
}

async function getAll(req, res) {
    try {
        const users = await userModel.findAll();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao listar usuários." });
    }
}

async function getById(req, res) {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // só aqui o CPF volta a ser legível
        const cpf = decrypt({ storedIv: user.cpf_iv, storedTag: user.cpf_tag, storedValue: user.cpf });

        return res.json({ id: user.id, fullName: user.full_name, birthDate: user.birth_date, email: user.email, phoneNumber: user.phone_number, cpf });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
}

async function create(req, res) {
    try {
        const { fullName, birthDate, email, phoneNumber, password, cpf } = req.body;
        const { salt, hash } = await generatePasswordHash(password); // sem volta
        const { iv, tag, encryptedValue } = encrypt(cpf);            // com volta
        const id = await userModel.create({ cpf: encryptedValue, cpfIv: iv, cpfTag: tag, fullName, birthDate, email, phoneNumber, passwordSalt: salt, passwordHash: hash });

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!", id });
    } catch (error) {
        if (isDuplicateError(error)) {
            return res.status(409).json({ error: "E-mail ou telefone já cadastrado." });
        }
        console.error(error);
        return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
}

async function update(req, res) {
    try {
        const { fullName, birthDate, email, phoneNumber, cpf } = req.body;
        // novo iv a cada criptografia: nunca reaproveitamos o antigo
        const { iv, tag, encryptedValue } = encrypt(cpf);
        const affectedRows = await userModel.update(req.params.id, { cpf: encryptedValue, cpfIv: iv, cpfTag: tag, fullName, birthDate, email, phoneNumber });

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
        if (isDuplicateError(error)) {
            return res.status(409).json({ error: "E-mail ou telefone já cadastrado." });
        }
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
}

async function remove(req, res) {
    try {
        const affectedRows = await userModel.remove(req.params.id);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao remover usuário." });
    }
}

module.exports = { create, getAll, getById, update, remove };