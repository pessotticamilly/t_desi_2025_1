const produtosModel = require("../models/produtosModel");

const buscarProduto = async (req, res) => {
    const produtos = await produtosModel.buscarTodos();

    res.json(produtos);
};

const buscarProdutoPorId = async (req, res) => {
    const id = req.params.id;
    const produto = await produtosModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    res.json(produto);
};

const criarProduto = async (req, res) => {
    const { nome, marca, preco } = req.body;
    const novoProduto = await produtosModel.criar(
        nome,
        marca,
        preco
    );

    res.status(201).json(novoProduto);
};

const editarProduto = async (req, res) => {
    const id = req.params.id;
    const { nome, marca, preco } = req.body;
    const produto = await produtosModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    const produtoAtualizado = await produtosModel.editar(
        id,
        nome,
        marca,
        preco
    );

    res.json(produtoAtualizado);
};

const excluirProduto = async (req, res) => {
    const id = req.params.id;
    const produto = await produtosModel.buscarPorId(id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    await produtosModel.excluir(id);

    res.json({
        mensagem: "Produto excluído com sucesso"
    });
};

module.exports = {
    buscarProduto,
    buscarProdutoPorId,
    criarProduto,
    editarProduto,
    excluirProduto
};