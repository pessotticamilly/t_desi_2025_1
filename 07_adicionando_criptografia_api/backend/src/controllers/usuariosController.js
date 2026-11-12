const usuariosModel = require("../models/usuariosModel");
const { gerarHashSenha, verificarHashSenha } = require("../utils/security/hash");
const { criptografar, descriptografar } = require("../utils/security/criptografia");

async function buscarTodos(req, res) {
    try {
        const usuarios = await usuariosModel.buscarTodos();

        const usuariosDescriptografados = usuarios.map((usuario) => {
            const cpf = descriptografar({
                ivArmazenado: usuario.cpfIv, 
                tagArmazenada: usuario.cpfTag, 
                valorArmazenado: usuario.cpf
            });

            return {
                id: usuario.id,
                cpf: cpf,
                nomeCompleto: usuario.nomeCompleto,
                dataNascimento: usuario.dataNascimento,
                email: usuario.email,
                telefone: usuario.telefone
            };
        });

        return res.json(usuariosDescriptografados);
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuários"});
    };
};

const buscarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario){
            return res.status(404).json({error: "Usuário não encontrado"});
        };

        const cpf = descriptografar({
            ivArmazenado: usuario.cpfIv, 
            tagArmazenada: usuario.cpfTag, 
            valorArmazenado: usuario.cpf
        });

        return res.json({
            id: usuario.id,
            cpf: cpf,
            nomeCompleto: usuario.nomeCompleto,
            dataNascimento: usuario.dataNascimento,
            email: usuario.email,
            telefone: usuario.telefone
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao buscar usuário"});
    };
};

async function criar(req, res) {
    try {
        const { cpf, nomeCompleto, dataNascimento, email, telefone, senha } = req.body;
        const { salt, hash } = await gerarHashSenha(senha);
        const { iv: cpfIv, tag: cpfTag, valorCriptografado: cpfCriptografado } = criptografar(cpf);

        await usuariosModel.criar({
            cpf: cpfCriptografado, 
            cpfIv: cpfIv, 
            cpfTag: cpfTag, 
            nomeCompleto, 
            dataNascimento, 
            email, 
            telefone, 
            senhaHash: hash, 
            senhaSalt: salt
        });

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao criar usuário"});
    };
};

async function editar(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        const { cpf, nomeCompleto, dataNascimento, email, telefone, senha} = req.body;
        const dadosAtualizados = {};

        // 2. Atualiza os campos comuns, se enviados
        if (nomeCompleto !== undefined) {
            dadosAtualizados.nomeCompleto = nomeCompleto;
        }

        if (dataNascimento !== undefined) {
            dadosAtualizados.dataNascimento = dataNascimento;
        }

        if (email !== undefined) {
            dadosAtualizados.email = email;
        }

        if (telefone !== undefined) {
            dadosAtualizados.telefone = telefone;
        }

        // 3. Criptografa o novo CPF, se enviado
        if (cpf !== undefined) {
            const { iv: cpfIv, tag: cpfTag, valorCriptografado: cpfCriptografado } = criptografar(cpf);

            dadosAtualizados.cpf = cpfCriptografado;
            dadosAtualizados.cpfIv = cpfIv;
            dadosAtualizados.cpfTag = cpfTag;
        }

        // 4. Gera um novo hash, se a senha foi enviada
        if (senha !== undefined) {
            const { salt: senhaSalt, hash: senhaHash } = await gerarHashSenha(senha);

            dadosAtualizados.senhaSalt = senhaSalt;
            dadosAtualizados.senhaHash = senhaHash;
        }

        // 5. Não permite uma atualização vazia
        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                error: "Nenhum campo enviado para atualização"
            });
        }

        // 6. Envia os campos ao Model
        await usuariosModel.editar(id, dadosAtualizados);

        return res.status(200).json({
            mensagem: "Usuário atualizado com sucesso"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erro ao editar usuário"
        });
    };
};

async function excluir(req, res) {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if(!usuario){
            return res.status(404).json({error: "Usuário não encontrado"});
        };

        await usuariosModel.excluir(id);

        return res.json({
            mensagem: "Usuário excluído com sucesso"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Erro ao excluir usuário"});
    };
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
};