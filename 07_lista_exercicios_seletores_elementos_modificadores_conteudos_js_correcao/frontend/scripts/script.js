// Questão 1
const titulo = document.querySelector('#titulo');
console.log(titulo);

// Questão 2
const subtitulo = document.querySelector('.subtitulo');
console.log(subtitulo.textContent);

// Questão 3
const produtos = document.querySelectorAll('.produto');
console.log(produtos.length); // 3

// Questão 4
// querySelectorAll retorna uma NodeList; acessa-se por índice, como um array
const precos = document.querySelectorAll('.preco');
console.log(precos[0].textContent);
// alternativa mais direta, já que só queremos o primeiro:
console.log(document.querySelector('.preco').textContent);

// Questão 5
const produto2 = document.querySelector('#produto-2');
console.log(produto2);
// no console, o elemento aparece com todas as tags internas (h2, p, etc),
// não só o texto — por isso dá pra "abrir" ele no DevTools e ver a estrutura

// Questão 6
const h2Produto1 = document.querySelector('#produto-1 h2');
console.log(h2Produto1.textContent); // "Caneca Personalizada" (sem a tag <strong>, só o texto)
console.log(h2Produto1.innerText);   // "Caneca Personalizada" (parecido com textContent aqui)
console.log(h2Produto1.innerHTML);   // "Caneca <strong>Personalizada</strong>" (mantém a tag HTML)
// Diferença principal a observar: textContent/innerText devolvem só o texto puro;
// innerHTML devolve o texto JUNTO com as tags HTML internas.

// Questão 7
document.querySelector('#titulo').textContent = 'Loja da Turma — Promoção!';

// Questão 8
document.querySelector('#rodape').textContent = 'Todos os direitos reservados © 2026';

// Questão 9
document.querySelector('#produto-3 .descricao').textContent = 'Perfeita para o inverno.';

// Questão 10
document.querySelector('#produto-2 h2').innerHTML = 'Camiseta <strong>Dev</strong> — Edição Limitada';
// Se usarmos textContent no lugar:
// document.querySelector('#produto-2 h2').textContent = 'Camiseta <strong>Dev</strong> — Edição Limitada';
// O resultado mostra o texto "Camiseta <strong>Dev</strong> — Edição Limitada" LITERALMENTE na tela,
// incluindo os sinais < e >, em vez de deixar "Dev" em negrito.
// Isso acontece porque textContent trata tudo como texto puro, sem interpretar tags.

// Questão 11
document.querySelector('#contador-carrinho').textContent = '3';

// Questão 12
document.querySelector('#lista-avisos').innerHTML = `
  <li>Parcele em até 3x sem juros</li>
  <li>Retirada grátis na loja física</li>
`;

// Questão 13
document.querySelector('#produto-1 h2').textContent = 'Caneca Exclusiva';        // por id (do container)
document.querySelector('.descricao').textContent = 'Aproveite enquanto durar.';  // por class (pega a primeira .descricao)
document.querySelector('#produto-3 .preco').textContent = 'R$ 39,90 (promoção)'; // por hierarquia (id + class)

// Questão 14
// Resposta esperada: precisaria de um elemento "clicável" (ex: um botão) e de uma forma
// de "escutar" o clique nele para só então rodar o código de alteração — isso é o
// addEventListener, que veremos na próxima aula.