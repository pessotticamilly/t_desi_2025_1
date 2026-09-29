# 🛒 API de Produtos — Node.js, Express, MVC e MySQL

API REST desenvolvida com **Node.js**, **Express** e **MySQL**, utilizando o padrão arquitetural **MVC (Model-View-Controller)**.

Este projeto foi desenvolvido com fins didáticos e tem como objetivo demonstrar, na prática, como construir uma API backend organizada, conectá-la a um banco de dados e implementar operações de **CRUD**.

---

## 📚 Sumário

* [Sobre o projeto](#-sobre-o-projeto)
* [O que é uma API?](#-o-que-é-uma-api)
* [Arquitetura MVC](#-arquitetura-mvc)
* [Tecnologias utilizadas](#-tecnologias-utilizadas)
* [Pré-requisitos](#-pré-requisitos)
* [Estrutura do projeto](#-estrutura-do-projeto)
* [Configuração do projeto](#-configuração-do-projeto)
* [Configuração do banco de dados](#-configuração-do-banco-de-dados)
* [Variáveis de ambiente](#-variáveis-de-ambiente)
* [Executando o projeto](#-executando-o-projeto)
* [Rotas da API](#-rotas-da-api)
* [CRUD](#-crud)
* [Exemplos de requisições](#-exemplos-de-requisições)
* [Respostas HTTP](#-respostas-http)
* [Fluxo de uma requisição](#-fluxo-de-uma-requisição)
* [Boas práticas utilizadas](#-boas-práticas-utilizadas)
* [Próximos passos](#-próximos-passos)
* [Autor](#-autor)

---

# 📌 Sobre o projeto

Este projeto consiste em uma API REST para gerenciamento de produtos.

A API permite realizar operações de:

* Listagem de produtos;
* Busca de um produto específico;
* Cadastro de produtos;
* Atualização de produtos;
* Exclusão de produtos.

Os dados são armazenados em um banco de dados **MySQL**.

O projeto utiliza o padrão **MVC**, separando as responsabilidades da aplicação em diferentes camadas.

---

# 🌐 O que é uma API?

API significa:

> **Application Programming Interface**

Em português:

> **Interface de Programação de Aplicações**

Uma API permite que diferentes sistemas se comuniquem entre si.

Por exemplo:

```text
Frontend
   │
   │ HTTP Request
   ▼
API
   │
   ▼
Banco de dados
```

O frontend pode solicitar:

```http
GET /produtos
```

A API recebe essa requisição, consulta o banco de dados e retorna uma resposta:

```json
[
    {
        "id": 1,
        "nome": "Notebook",
        "preco": 3500
    },
    {
        "id": 2,
        "nome": "Mouse",
        "preco": 80
    }
]
```

A API funciona, portanto, como uma ponte entre o cliente e os dados.

---

# 🔄 O que é uma API REST?

REST significa:

> **Representational State Transfer**

Uma API REST utiliza o protocolo HTTP para permitir que clientes realizem operações sobre recursos.

Neste projeto, nosso principal recurso é:

```text
/produtos
```

Os principais métodos HTTP utilizados são:

| Método   | Função                 |
| -------- | ---------------------- |
| `GET`    | Buscar dados           |
| `POST`   | Criar dados            |
| `PUT`    | Atualizar dados        |
| `PATCH`  | Atualizar parcialmente |
| `DELETE` | Excluir dados          |

Exemplo:

```http
GET /produtos
```

significa:

> "Quero consultar os produtos."

Enquanto:

```http
POST /produtos
```

significa:

> "Quero cadastrar um novo produto."

---

# 🏗️ Arquitetura MVC

MVC significa:

> **Model - View - Controller**

É um padrão arquitetural utilizado para organizar a aplicação separando responsabilidades.

Neste projeto:

```text
             API
              │
              ▼
            ROUTES
              │
              ▼
          CONTROLLER
              │
              ▼
            MODEL
              │
              ▼
            MYSQL
```

## Model

Responsável pela comunicação com o banco de dados.

Exemplo:

```text
produtoModel.js
```

É na Model que ficam operações como:

```text
buscar produtos
buscar produto por ID
criar produto
atualizar produto
excluir produto
```

---

## Controller

Responsável por receber a requisição e controlar o fluxo da operação.

Por exemplo:

```text
GET /produtos
        ↓
ProdutoController.listar()
        ↓
ProdutoModel.buscarTodos()
```

O Controller também é responsável por enviar a resposta para o cliente.

---

## Routes

As Routes definem os endpoints disponíveis na API.

Exemplo:

```text
GET /produtos
GET /produtos/:id
POST /produtos
PUT /produtos/:id
DELETE /produtos/:id
```

---

## View

Em aplicações MVC tradicionais, a View é responsável pela interface apresentada ao usuário.

Como este projeto é uma **API**, não possuímos uma View tradicional.

A API trabalha principalmente com dados, normalmente enviados e recebidos no formato **JSON**.

Podemos representar isso assim:

```text
MVC tradicional:

Model → Controller → View


API:

Model → Controller → JSON
```

---

# 🛠️ Tecnologias utilizadas

## Node.js

**Versão:** `A DEFINIR`

Node.js é o ambiente de execução utilizado para executar JavaScript no backend.

Permite utilizar JavaScript fora do navegador.

Neste projeto, o Node.js é responsável por executar nossa API.

---

## JavaScript

**Versão:** `A DEFINIR`

É a linguagem utilizada para desenvolver a aplicação.

É utilizada tanto para:

* regras da aplicação;
* Controllers;
* Models;
* Routes;
* configuração do servidor.

---

## Express

**Versão:** `A DEFINIR`

Express é um framework para Node.js utilizado para facilitar a criação de aplicações web e APIs.

Neste projeto, ele é responsável principalmente por:

* criar o servidor;
* criar rotas;
* receber requisições HTTP;
* enviar respostas;
* utilizar middlewares.

Exemplo:

```js
const express = require("express");

const app = express();
```

---

## MySQL

**Versão:** `A DEFINIR`

MySQL é o sistema gerenciador de banco de dados utilizado pelo projeto.

É responsável por armazenar os dados de forma persistente.

Exemplo:

```text
produtos

┌────┬──────────┬───────┐
│ id │ nome     │ preco │
├────┼──────────┼───────┤
│ 1  │ Notebook │ 3500  │
│ 2  │ Mouse    │ 80    │
└────┴──────────┴───────┘
```

---

## mysql2

**Versão:** `A DEFINIR`

Biblioteca utilizada pelo Node.js para estabelecer comunicação com o MySQL.

Permite executar comandos SQL através da aplicação.

Exemplo:

```js
const [produtos] = await db.query(
    "SELECT * FROM produtos"
);
```

---

## dotenv

**Versão:** `A DEFINIR`

Biblioteca utilizada para carregar variáveis de ambiente a partir de um arquivo `.env`.

É utilizada para armazenar configurações que não devem ficar diretamente no código, como:

```text
senha do banco
usuário do banco
nome do banco
porta
```

---

# 📦 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm
* MySQL
* Git (opcional, mas recomendado)

Para verificar o Node.js:

```bash
node --version
```

Para verificar o npm:

```bash
npm --version
```

Para verificar o MySQL:

```bash
mysql --version
```

---

# 📁 Estrutura do projeto

A estrutura atual do projeto é:

```text
api-produtos/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── produtoController.js
│   │
│   ├── models/
│   │   └── produtoModel.js
│   │
│   ├── routes/
│   │   └── produtoRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

## `src/`

Contém o código-fonte da aplicação.

---

### `config/`

Contém configurações da aplicação.

Atualmente:

```text
database.js
```

é responsável pela conexão com o banco de dados.

---

### `controllers/`

Contém os Controllers da aplicação.

Exemplo:

```text
produtoController.js
```

Responsável por controlar as requisições relacionadas aos produtos.

---

### `models/`

Contém as Models.

Exemplo:

```text
produtoModel.js
```

Responsável pelas operações relacionadas aos produtos no banco de dados.

---

### `routes/`

Contém as rotas da API.

Exemplo:

```text
produtoRoutes.js
```

Define os endpoints relacionados aos produtos.

---

### `app.js`

Responsável pela configuração da aplicação Express.

É onde configuramos:

* Express;
* middlewares;
* rotas.

---

### `server.js`

Responsável por iniciar o servidor.

Exemplo:

```js
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

# 🔐 Configuração do projeto

## 1. Clone o projeto

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta:

```bash
cd api-produtos
```

---

## 2. Instale as dependências

```bash
npm install
```

O npm utilizará o arquivo:

```text
package.json
```

para instalar todas as dependências necessárias.

---

# 🗄️ Configuração do banco de dados

Crie um banco de dados no MySQL:

```sql
CREATE DATABASE minha_api;
```

Selecione o banco:

```sql
USE minha_api;
```

Crie a tabela:

```sql
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);
```

Opcionalmente, podemos inserir alguns produtos para testes:

```sql
INSERT INTO produtos (nome, preco)
VALUES
    ('Notebook', 3500),
    ('Mouse', 80);
```

---

# 🔑 Variáveis de ambiente

Crie um arquivo:

```text
.env
```

na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=minha_api
DB_PORT=3306

PORT=3033
```

> ⚠️ Nunca compartilhe o arquivo `.env` publicamente.

O `.env` deve estar no `.gitignore`:

```gitignore
node_modules/
.env
```

Para projetos reais, informações como senhas e credenciais devem ser mantidas fora do código-fonte.

---

# ▶️ Executando o projeto

Após instalar as dependências e configurar o banco de dados:

```bash
npm start
```

Ou, caso o projeto utilize um script de desenvolvimento:

```bash
npm run dev
```

Quando o servidor iniciar, deverá aparecer uma mensagem semelhante a:

```text
Servidor rodando na porta 3033
```

A API estará disponível em:

```text
http://localhost:3033
```

---

# 🛣️ Rotas da API

## Produtos

### Listar todos os produtos

```http
GET /produtos
```

Exemplo:

```text
GET http://localhost:3033/produtos
```

Resposta:

```json
[
    {
        "id": 1,
        "nome": "Notebook",
        "preco": 3500
    },
    {
        "id": 2,
        "nome": "Mouse",
        "preco": 80
    }
]
```

---

## Buscar produto por ID

```http
GET /produtos/:id
```

Exemplo:

```text
GET /produtos/1
```

Resposta:

```json
{
    "id": 1,
    "nome": "Notebook",
    "preco": 3500
}
```

Caso o produto não exista:

```json
{
    "mensagem": "Produto não encontrado"
}
```

Status HTTP:

```text
404 Not Found
```

---

# ➕ Cadastrar produto

```http
POST /produtos
```

O corpo da requisição deve ser enviado em JSON:

```json
{
    "nome": "Teclado",
    "preco": 150
}
```

Exemplo:

```text
POST http://localhost:3033/produtos
```

Resposta esperada:

```json
{
    "id": 3,
    "nome": "Teclado",
    "preco": 150
}
```

---

# ✏️ Atualizar produto

```http
PUT /produtos/:id
```

Exemplo:

```text
PUT /produtos/3
```

Body:

```json
{
    "nome": "Teclado Mecânico",
    "preco": 250
}
```

---

# 🗑️ Excluir produto

```http
DELETE /produtos/:id
```

Exemplo:

```text
DELETE /produtos/3
```

A API deverá excluir o produto correspondente ao ID informado.

---

# 🔄 CRUD

CRUD representa as quatro operações básicas de persistência de dados:

| CRUD       | HTTP        | Operação  |
| ---------- | ----------- | --------- |
| **C**reate | `POST`      | Criar     |
| **R**ead   | `GET`       | Ler       |
| **U**pdate | `PUT/PATCH` | Atualizar |
| **D**elete | `DELETE`    | Excluir   |

Neste projeto:

```text
CREATE
POST /produtos

READ
GET /produtos
GET /produtos/:id

UPDATE
PUT /produtos/:id

DELETE
DELETE /produtos/:id
```

---

# 📡 Fluxo de uma requisição

Uma requisição:

```http
GET /produtos/1
```

passa pelas seguintes etapas:

```text
Cliente
   │
   │ GET /produtos/1
   ▼
Route
   │
   ▼
Controller
   │
   ▼
Model
   │
   ▼
MySQL
   │
   │ dados
   ▼
Model
   │
   ▼
Controller
   │
   │ JSON
   ▼
Cliente
```

### Na prática:

**1. Route**

Identifica:

```text
GET /produtos/:id
```

**2. Controller**

Obtém o ID:

```js
const { id } = req.params;
```

**3. Model**

Executa a consulta:

```sql
SELECT * FROM produtos WHERE id = ?
```

**4. MySQL**

Retorna o produto.

**5. Controller**

Envia:

```json
{
    "id": 1,
    "nome": "Notebook",
    "preco": 3500
}
```

---

# 📊 Status HTTP

A API utiliza códigos HTTP para indicar o resultado das requisições.

| Código | Significado           |
| ------ | --------------------- |
| `200`  | OK                    |
| `201`  | Created               |
| `400`  | Bad Request           |
| `404`  | Not Found             |
| `500`  | Internal Server Error |

Exemplos:

### Sucesso

```http
200 OK
```

### Recurso criado

```http
201 Created
```

### Produto não encontrado

```http
404 Not Found
```

### Erro interno

```http
500 Internal Server Error
```

---

# 🧩 Middleware

O Express utiliza middlewares para executar funções durante o processamento de uma requisição.

Um exemplo utilizado neste projeto:

```js
app.use(express.json());
```

Esse middleware permite que o Express interprete requisições que possuem dados em formato JSON.

Por exemplo:

```json
{
    "nome": "Notebook",
    "preco": 3500
}
```

Depois disso, conseguimos acessar os dados através de:

```js
req.body
```

---

# 🔒 Segurança

Algumas informações importantes não devem ser armazenadas diretamente no código.

Evite:

```js
const password = "123456";
```

Prefira:

```js
const password = process.env.DB_PASSWORD;
```

As informações sensíveis devem ficar no:

```text
.env
```

E o `.env` deve ser ignorado pelo Git:

```gitignore
.env
```

---

# 🧹 Boas práticas utilizadas

Este projeto procura seguir algumas boas práticas:

* Separação de responsabilidades através do MVC;
* Uso de variáveis de ambiente;
* Separação da configuração do banco;
* Uso de `async/await`;
* Uso de consultas parametrizadas;
* Organização das rotas;
* Uso adequado dos métodos HTTP;
* Uso de códigos de status HTTP;
* Separação entre Controller e Model;
* Não armazenar credenciais diretamente no código.

---

# 🧠 Por que utilizar MVC?

Sem organização, uma API pode acabar ficando assim:

```text
server.js

↓
rotas
↓
SQL
↓
regras de negócio
↓
respostas
↓
validações
```

Tudo misturado em um único arquivo.

Com MVC:

```text
Routes
   ↓
Controller
   ↓
Model
   ↓
Database
```

Cada parte possui uma responsabilidade específica.

Isso facilita:

* manutenção;
* leitura do código;
* testes;
* trabalho em equipe;
* reutilização;
* crescimento da aplicação.

---

# 🚀 Próximos passos

Depois de compreender o funcionamento deste projeto, alguns possíveis próximos passos são:

### 1. Validação

Validar informações recebidas pelo cliente.

Exemplo:

```text
nome obrigatório
preço maior que zero
```

### 2. Tratamento centralizado de erros

Criar um middleware específico para tratamento de erros.

### 3. Relacionamentos

Adicionar novas entidades:

```text
Produtos
Categorias
Usuários
Pedidos
```

E criar relacionamentos entre elas.

### 4. Autenticação

Adicionar:

```text
Login
Senha
JWT
Autorização
```

### 5. ORM

Depois de aprender SQL e `mysql2`, experimentar um ORM, como:

```text
Prisma
```

### 6. Documentação

Adicionar documentação da API utilizando ferramentas como:

```text
Swagger / OpenAPI
```

### 7. Testes

Adicionar testes automatizados para os endpoints e regras da aplicação.

---

# 🧪 Ferramentas para testar a API

A API pode ser testada utilizando ferramentas como:

* Postman;
* Insomnia;
* Thunder Client;
* REST Client;
* `curl`;
* frontend próprio.

Exemplo utilizando `curl`:

```bash
curl http://localhost:3033/produtos
```

---

# 👩‍💻 Objetivo didático

Este projeto foi desenvo
