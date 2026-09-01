// Bloco 1

// Questão 1
document.querySelector('#titulo').classList.add('destaque');

// Questão 2
document.querySelector('#produto-1').classList.add('ativo');

// Questão 3
document.querySelector('#caixa-mensagem').classList.remove('escondido');

// Questão 4
document.querySelector('#produto-2').classList.toggle('ativo');

// Bloco 2

// Questão 5
document.querySelector('#btn-tema').addEventListener('click', function () {
  document.body.classList.toggle('ativo');
});

// Questão 6
document.querySelector('#btn-favoritar-1').addEventListener('click', function () {
  document.querySelector('#produto-1').classList.add('destaque');
});

document.querySelector('#btn-favoritar-2').addEventListener('click', function () {
  document.querySelector('#produto-2').classList.add('destaque');
});
// repetitivo de propósito — ainda não vimos forEach para evitar essa repetição.
// vale comentar em aula que existe um jeito de fazer isso sem repetir código,
// e que é exatamente o que vem no próximo bloco de conteúdo (arrays).

// Questão 7
document.querySelector('#produto-1').addEventListener('click', function () {
  console.log(document.querySelector('#produto-1 h2').textContent);
});

// Bloco 3

// Questão 8
const imagem = document.querySelector('#imagem-produto');
imagem.addEventListener('mouseover', function () {
  imagem.classList.add('destaque');
});
imagem.addEventListener('mouseout', function () {
  imagem.classList.remove('destaque');
});

// Questão 9
const campoBusca = document.querySelector('#campo-busca');
const resultadoBusca = document.querySelector('#resultado-busca');
campoBusca.addEventListener('input', function () {
  resultadoBusca.textContent = 'Você digitou: ' + campoBusca.value;
});

// Questão 10
document.querySelector('#form-contato').addEventListener('submit', function (evento) {
  evento.preventDefault(); // impede o recarregamento da página
  const feedback = document.querySelector('#feedback-form');
  feedback.textContent = 'E-mail enviado!';
  feedback.classList.add('sucesso');
});

// Questão 11
document.querySelector('#campo-email').addEventListener('blur', function () {
  const campo = document.querySelector('#campo-email');
  const feedback = document.querySelector('#feedback-form');
  if (campo.value === '') {
    feedback.textContent = 'Preencha o e-mail';
    feedback.classList.add('erro');
  }
});

// Questão 12 (Desafio)
document.querySelector('#campo-busca').addEventListener('keydown', function (evento) {
  if (evento.key === 'Enter') {
    console.log('Busca confirmada!');
  }
});

// Bloco 4

// Questão 13
// Cada situação é um tipo de interação diferente do usuário.
// Se existisse um único evento genérico, o código não teria como saber SE
// foi um clique, uma tecla ou um mouse passando por cima.
// Eventos específicos deixam claro qual interação disparou aquele código.