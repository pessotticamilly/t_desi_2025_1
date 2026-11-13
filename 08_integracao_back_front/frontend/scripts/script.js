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

function mostrarMensagem(texto, ehErro = false) {
    mensagem.textContent = texto;
    mensagem.className = ehErro ? 'erro' : 'sucesso';
}

async function listarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar produtos.');
        }

        const produtos = await resposta.json();
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5">Nenhum produto cadastrado.</td> 
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
    }
}

listarProdutos();