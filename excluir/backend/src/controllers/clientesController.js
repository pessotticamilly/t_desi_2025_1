const clientesModel = require("../models/clientesModel");

const buscarClientes = (req, res) => {
    response.json(clientesModel)
};

const buscarClientePorId = (req, res) => {
    const id = req.params.id;
    const cliente = clientesModel.find(cliente => cliente.id == id);

    if(!cliente) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        })
    }

    res.json(cliente)
};

const criarCliente = (req, res) => {
    const novoCliente = {
        id: clientesModel.length + 1,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone
    }

    clientesModel.push(novoCliente);

    res.status(201).json(novoCliente);
};

const editarCliente = (req, res) => {
    const id = req.params.id;
    const cliente = clientesModel.find(cliente => cliente.id == id);

    if(!cliente) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        });
    }

    cliente.nome = req.body.nome;
    cliente.email = req.body.email;
    cliente.telefone = req.body.telefone;

    res.json(cliente);
};

const excluirCliente = (req, res) => {
    const id = req.params.id;
    const clienteIndex = clientesModel.findIndex(cliente => cliente.id == id);

    if (clienteIndex == -1) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        });
    }

    clientesModel.splice(clienteIndex, 1);
    
    res.json({
        mensagem: "Cliente excluído com sucesso"
    })
};

module.exports = {
    buscarClientes,
    buscarClientePorId,
    criarCliente,
    editarCliente,
    excluirCliente
}