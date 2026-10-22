DROP DATABASE IF EXISTS crypto_bd;

CREATE DATABASE crypto_bd;
USE crypto_bd;

CREATE TABLE usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARBINARY(32) NOT NULL,
    cpfIv BINARY(12) NOT NULL,
    cpfTag BINARY(16) NOT NULL,
    nomeCompleto VARCHAR(150) NOT NULL,
    dataNascimento DATE NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    telefone BIGINT NOT NULL UNIQUE,
    senhaSalt BINARY(16) NOT NULL,
    senhaHash BINARY(64) NOT NULL
);