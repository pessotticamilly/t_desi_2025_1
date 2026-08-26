console.log("Olá, Mundo!")

// VARIÁVEIS

const userName = "Ana";
let usersList = ["Ana", "Bento", "Carlos", "Diana"];

// FUNÇÕES

// Cria a função
function logName(name) {
    console.log(name);
};

// "Chama" a função --> é quando ela é executada
logName(userName);

// SELETORES DE ELEMENTOS

// <p> --> tag de abertura
// </p> --> tag de fechamento
// Olá, Mundo! --> conteúdo
// <p>Olá, Mundo!</p> --> elemento

// Método get:

// getElementById() --> Seleciona UM elemento pelo id
// const titulo = document.getElementById("titulo");
// console.log(titulo);

// getElementsByClassName() --> Seleciona elementos pela classe
// const textos = document.getElementsByClassName("texto");
// console.log(textos);
// console.log(textos[0]);

// getElementsByTagName() --> Seleciona elementos pela tag HTML
const paragrafos = document.getElementsByTagName("p");
console.log(paragrafos);
console.log(paragrafos[1]);

// Métodos query:

// querySelector() --> Seleciona o primeiro elemnto que corresponde ao seletor CSS

// ID
// const titulo = document.querySelector("#titulo");
// console.log(titulo);

// Class
const texto = document.querySelector(".texto");
console.log(texto);

// Tag HTML
const paragrafo = document.querySelector("p");
console.log(paragrafo)

// Elementro dentro de elemento
const tituloMain = document.querySelector("main h1")
console.log(tituloMain)

// querySelectorAll() --> Seleciona todos os elementos correspondente ao seletor CSS
const textos = document.querySelectorAll(".texto");
console.log(textos);
console.log(textos[2]);

// MODIFICADORES DE CONTEÚDO
// Formas de ler e alterar conteúdos de um elemento HTML

const titulo = document.getElementById("titulo");

// textContent --> pega ou altera o TEXTO que está dentro do elemento, independente se estiver visível ou não
console.log(titulo.textContent);
// titulo.textContent = "<strong>Teste</strong>";

// innerText --> igual ao textContent, mas, só pega o que está visível na tela
// console.log(titulo.innerText);

// innerHTML --> trabalha com HTML
titulo.innerHTML += "<strong>Teste</strong>";