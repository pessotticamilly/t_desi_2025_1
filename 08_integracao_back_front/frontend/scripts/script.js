const API_URL = "http://localhost:3033";

const tituloFormulario = document.getElementById("tituloFormulario");
const formProduto = document.getElementById("formProduto");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("preco");
const botaoCancelar = document.getElementById("botaoCancelar");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");
const idBusca = document.getElementById("idBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoListar = document.getElementById("botaoListar");
const resultadoBusca = document.getElementById("resultadoBusca");
const botaoAtualizarLista = document.getElementById("botaoAtualizarLista");
const listaProdutos = document.getElementById("listaProdutos");

let idProdutoEditando = null;

function mostrarMensagem(texto, ehErro = false) {
    mensagem.textContent = texto;
    mensagem.className = ehErro ? 'erro' : 'sucesso';
}

function limparFormulario() {
    formProduto.reset();
    idProdutoEditando = null;
    tituloFormulario.textContent = "Cadastrar produto";
    botaoSalvar.textContent = "Cadastrar";
};

async function buscarTodosProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos');
        };

        const produtos = await resposta.json();
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado</td> 
                </tr>
            `;
            return;
        };

        produtos.forEach((produto) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                    <td>
                    <button onclick ="prepararEdicao(${produto.id})">
                        Editar
                      </button>

                      <button onclick="excluirProduto(${produto.id})">
                          Excluir
                      </button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
};

async function buscarProdutoPorId() {
    const id = idBusca.value;

    if(!id) {
        resultadoBusca.textContent = "Informe um ID";
    };

    try {
        const resposta = await fetch(`${API_URL}/produtos/${idBusca.value}`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao buscar produto');
        };

        const dados = await resposta.json();
        const produto = dados[0];

        if (!produto) {
            resultadoBusca.textContent = "Produto não encontrado"
            return;
        };

        resultadoBusca.innerHTML = `
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Nome:</strong> ${produto.nome}</p>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Preço:</strong> ${produto.preco}</p>
        `;
    } catch(erro) {
        resultadoBusca.textContent = erro.message;
    };
};

async function cadastrarProduto(dadosProduto) {
    const resposta = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProduto)
    });

    if(!resposta.ok) {
            throw new Error('Erro ao cadastrar produto');
    };

    const resultado = await resposta.json();

    return resultado;
};

async function prepararEdicao(id) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produto");
        };

        const dados = await resposta.json();
        const produto = dados[0];

        idProdutoEditando = produto.id;

        nome.value = produto.nome;
        descricao.value = produto.descricao;
        preco.value = produto.preco;

        tituloFormulario.textContent = "Editar Produto";
        botaoSalvar.textContent = "Salvar alterações";

        window.scrollTo(0, 0);
    } catch(erro) {
        mostrarMensagem(erro.message, true);
    };
};

async function editarProduto(id, dadosProduto) {
    const resposta = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProduto)
    });

    if(!resposta.ok) {
        throw new Error("Erro ao editar produto");
    };

    const resultado = await resposta.json();

    return resultado;
};

botaoBuscar.addEventListener("click", buscarProdutoPorId);
formProduto.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dadosProduto = {
        nome: nome.value,
        descricao: descricao.value,
        preco: preco.value
    };

    try {
        if(idProdutoEditando === null) {
            await cadastrarProduto(dadosProduto);
            mostrarMensagem('Produto cadastrado com sucesso');
        } else {
            await editarProduto(idProdutoEditando, dadosProduto);
            mostrarMensagem('Produto editado com sucesso')
        };
        
        limparFormulario();
        buscarTodosProdutos();
    } catch(erro) {
        mostrarMensagem(erro.message, true);
    };
});

buscarTodosProdutos();