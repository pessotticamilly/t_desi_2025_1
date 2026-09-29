const produtosModel = require("../models/produtosModel");

const buscarProduto = (req, res) => {
    res.json(produtosModel)
};

const buscarProdutoPorId = (req, res) => {
    const id = req.params.id;
    const produto = produtosModel.find(produto => produto.id == id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        })
    }

    res.json(produto)
};

const criarProduto = (req, res) => {
    const novoProduto = {
        id: produtosModel.length + 1,
        nome: req.body.nome,
        marca: req.body.marca,
        preco: req.body.preco
    }

    produtosModel.push(novoProduto);

    res.status(201).json(novoProduto); F
};

const editarProduto = (req, res) => {
    const id = req.params.id;
    const produto = produtosModel.find(produto => produto.id == id);

    if (!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    produto.nome = req.body.nome;
    produto.marca = req.body.marca;
    produto.preco = req.body.preco;

    res.json(produto);
};

const excluirProduto = (req, res) => {
    const id = req.params.id;
    const produtoIndex = produtosModel.findIndex(produto => produto.id == id);

    if (produtoIndex == -1) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    produtosModel.splice(produtoIndex, 1);

    res.json({
        mensagem: "Produto excluído com sucesso"
    })
};

module.exports = {
    buscarProduto,
    buscarProdutoPorId,
    criarProduto,
    editarProduto,
    excluirProduto
}