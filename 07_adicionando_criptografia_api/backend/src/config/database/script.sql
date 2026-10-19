DROP DATABASE IF EXISTS crypto_bd;

CREATE DATABASE crypto_bd;
USE crypto_bd;

CREATE TABLE usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARBINARY(32) NOT NULL,
    cpf_iv BINARY(12) NOT NULL,
    cpf_tag BINARY(16) NOT NULL,
    nome_completo VARCHAR(150) NOT NULL,
    data_aniversario DATE NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    phone_number BIGINT NOT NULL UNIQUE,
    senha_hash BINARY(64) NOT NULL,
    senha_salt BINARY(16) NOT NULL
);