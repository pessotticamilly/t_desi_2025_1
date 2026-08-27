console.log("Olá, Mundo!");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// +-----------+
// | VARIÁVEIS |
// +-----------+

const userName = "Ana"; // Cria uma constante
let usersList = ["Ana", "Bento", "Carlos", "Diana"]; // Cria uma variável

// Não usar var para criar variáveis!

// Principais problemas do var:
// 1. Escopo de função (vazamento de bloco): Variáveis criadas com var dentro de um bloco como um if ou um loop for vazam para fora dele, ficando visíveis em toda a função.
// 2. Redeclaração silenciosa: O var permite declarar a mesma variável várias vezes no mesmo escopo sem nenhum aviso ou erro, o que pode sobrescrever dados importantes por acidente.
// 3. Elevação (Hoisting): Variáveis declaradas com var são jogadas para o topo do escopo antes de o código rodar, permitindo que você as acesse antes da linha de declaração (retornando undefined em vez de um erro claro).

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// +---------+
// | FUNÇÕES |
// +---------+

// Cria a função
function logName(name) {
    console.log("name: " + name);
};

// "Chama" a função --> é quando ela é executada
logName(userName);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Em "<p>Olá, Mundo!</p>" temos:
// "<p>" --> tag de abertura
// "</p>" --> tag de fechamento
// "Olá, Mundo!" --> conteúdo
// "<p>Olá, Mundo!</p>" --> elemento

// +------------------------+
// | SELETORES DE ELEMENTOS |
// +------------------------+

// MÉTODOS GET:

// getElementById() --> Seleciona UM elemento pelo id
// const titulo = document.getElementById("titulo");
// console.log("titulo: " + titulo);

// getElementsByClassName() --> Seleciona elementos pela classe
// const textos = document.getElementsByClassName("texto");
// console.log("textos: " + textos);
// console.log("textos[0]: " + textos[0]);

// getElementsByTagName() --> Seleciona elementos pela tag HTML
const paragrafos = document.getElementsByTagName("p");
console.log("paragrafos: " + paragrafos);
console.log("paragrafos[1]: " + paragrafos[1]);

// MÉTODOS QUERY:

// querySelector() --> Seleciona o primeiro elemento que corresponde ao seletor CSS

// const titulo = document.querySelector("#titulo"); // Seleciona pelo id
// console.log("titulo: " + titulo);

const texto = document.querySelector(".texto"); // Seleciona pela class
console.log("texto: " + texto);

const paragrafo = document.querySelector("p"); // Seleciona pela tag HTML
console.log("paragrafo: " + paragrafo);

const tituloMain = document.querySelector("main h1"); // Seleciona um elemento dentro de outro
console.log("tituloMain: " + tituloMain);

// querySelectorAll() --> Seleciona todos os elementos correspondente ao seletor CSS
const textos = document.querySelectorAll(".texto");
console.log("textos: " + textos);
console.log("textos[2]: " + textos[2]);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// +---------------------------+
// | MODIFICADORES DE CONTEÚDO |
// +---------------------------+

// Formas de ler e alterar conteúdos de um elemento HTML

const titulo = document.getElementById("titulo");

// textContent --> pega ou altera o TEXTO que está dentro do elemento, independente se estiver visível ou não
// console.log("titulo.textContent: " + titulo.textContent); // lê o conteúdo 
// titulo.textContent = "<strong>Teste</strong>"; // altera o conteúdo

// innerText --> igual ao textContent, mas, só pega o que está visível na tela
// console.log("titulo.innerText: " + titulo.innerText);
// titulo.innerText = "Título Alterado"

// innerHTML --> trabalha com HTML
console.log("titulo.innerHTML: " + titulo.innerHTML);
titulo.innerHTML += "<strong>Teste</strong>";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
