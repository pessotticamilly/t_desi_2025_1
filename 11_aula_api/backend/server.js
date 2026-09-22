
const express = require("express");
const app = express();
const PORT = 3033;

const listaProdutos = [
    {
        id: 1,
        nome: "Notebook",
        marca: "Samsung",
        preco: 3500.00
    },
    {
        id: 2,
        nome: "Mouse",
        marca: "Redragon",
        preco: 199.90
    }
]

app.use(express.json());

app.get("/produtos", (request, response) => {
    response.json(listaProdutos)
});

app.get("/produtos/:id", (req, res) => {
    const id = req.params.id;
    const produto = listaProdutos.find(produto => produto.id == id);

    if(!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        })
    }

    res.json(produto)
});

app.post("/produtos", (req, res) => {
    const novoProduto = {
        id: listaProdutos.length + 1,
        nome: req.body.nome,
        marca: req.body.marca,
        preco: req.body.preco
    }

    listaProdutos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// app.put("/produtos/:id", (req, res) => {
// });

// app.delete("/produtos/:id", (req, res) => {
// });

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});