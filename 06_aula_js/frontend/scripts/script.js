console.log("Olá, Mundo!");

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// +-----------+
// | VARIÁVEIS |
// +-----------+

const user = "Ana"; // Cria uma constante
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
function logName(user) {
    console.log("user: " + user);
};

// "Chama" a função --> É quando ela é executada
logName(user);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Em "<p>Olá, Mundo!</p>" temos:
// "<p>" --> Tag de abertura
// "</p>" --> Tag de fechamento
// "Olá, Mundo!" --> Conteúdo
// "<p>Olá, Mundo!</p>" --> Elemento

// +------------------------+
// | SELETORES DE ELEMENTOS |
// +------------------------+

// MÉTODOS GET:

// getElementById() --> Seleciona UM elemento pelo id
// const title = document.getElementById("title");
// console.log("title: " + title);

// getElementsByClassName() --> Seleciona elementos pela classe
// const texts = document.getElementsByClassName("text");
// console.log("texts: " + texts);
// console.log("texts[0]: " + texts[0]);

// getElementsByTagName() --> Seleciona elementos pela tag HTML
const paragraphs = document.getElementsByTagName("p");
console.log("paragraphs: " + paragraphs);
console.log("paragraphs[1]: " + paragraphs[1]);

// MÉTODOS QUERY:

// querySelector() --> Seleciona o PRIMEIRO elemento que corresponde ao seletor CSS, ou seja, seleciona apenas UM elemento

// const title = document.querySelector("#title"); // Seleciona pelo id
// console.log("title: " + title);

const text = document.querySelector(".text"); // Seleciona pela class
console.log("text: " + text);

const paragraph = document.querySelector("p"); // Seleciona pela tag HTML
console.log("paragraph: " + paragraph);

// const section = document.querySelector("main section"); // Seleciona um elemento dentro de outro
// console.log("section: " + section);

// querySelectorAll() --> Seleciona TODOS os elementos correspondente ao seletor CSS
const texts = document.querySelectorAll(".text");
console.log("texts: " + texts);
console.log("texts[2]: " + texts[2]);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// +---------------------------+
// | MODIFICADORES DE CONTEÚDO |
// +---------------------------+

// Formas de ler ou alterar conteúdos de um elemento HTML

const title = document.getElementById("title");

// textContent --> Pega ou altera o TEXTO que está dentro do elemento, independente se estiver visível ou não
console.log("title.textContent: " + title.textContent); // lê o conteúdo 
title.textContent = "Título alterado pelo textContent"; // altera o conteúdo

// innerText --> igual ao textContent, mas, só pega o que está visível na tela
console.log("title.innerText: " + title.innerText);
title.innerText = "Título alterado pelo innerText";

// innerHTML --> trabalha com HTML
const section = document.querySelector("section");
console.log("section.innerHTML: " + section.innerHTML);
section.innerHTML += "<p><strong>Teste</strong></p>";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
