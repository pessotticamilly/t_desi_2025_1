const produtosModel = require('../models/produtosModel');

async function buscarTodosProdutos(req, res) {
    try {
        const produtos = await produtosModel.buscarTodosProdutos();
    
        return res.json(produtos);
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao buscar produto",
            erro: error
        });
    };
};

async function buscarProdutoPorId(req, res) {
    try { 
        const id = req.params.id;
        const produto = await produtosModel.buscarProdutoPorId(id);

        if(!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado",
            });
        };

        return res.json(produto);
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao buscar produto",
            erro: error
        });
    };
};

async function criarProduto(req, res) {
    try { 
        const { nome, descricao, preco } = req.body;
        const produto = await produtosModel.criarProduto(nome, descricao, preco);

        return res.status(201).json({
            id: produto.insertedId,
            nome: nome,
            descricao: descricao,
            preco: preco
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao criar produto",
            erro: error
        });
    };
};

async function editarProduto(req, res) {
    try {
        const id = req.params.id;
        const produto = await produtosModel.buscarProdutoPorId(id);

        if(!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado",
            });
        }

        const { nome, descricao, preco } = req.body;
        await produtosModel.editarProduto(id, nome, descricao, preco);

        return res.status(201).json({
            id: id,
            nome: nome,
            descricao: descricao,
            preco: preco
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao editar produto",
            erro: error
        });
    };
};

async function excluirProduto(req, res) {
    try { 
        const id = req.params.id;
        const produto = await produtosModel.buscarProdutoPorId(id);

        if(!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado",
            });
        };

        await produtosModel.excluirProduto(id);

        return res.status(201).json({
            mensagem: "Produto excluído com sucesso"
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            mensagem: "Erro ao excluir produto",
            erro: error
        });
    };
};

module.exports = {
    buscarTodosProdutos,
    buscarProdutoPorId,
    criarProduto,
    editarProduto,
    excluirProduto
};