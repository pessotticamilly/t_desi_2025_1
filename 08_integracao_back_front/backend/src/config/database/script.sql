DROP DATABASE IF EXISTS lojinha;

CREATE DATABASE lojinha;
USE lojinha;

CREATE TABLE produtos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DOUBLE NOT NULL
);
