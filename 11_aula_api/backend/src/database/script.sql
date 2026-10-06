DROP DATABASE IF EXISTS lojinha;

CREATE DATABASE lojinha;
USE lojinha;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL CHECK(preco > 0)
);

INSERT INTO produtos (nome, marca, preco) VALUES
('Notebook', 'Samsung', 4500.00),
('Mouse', 'Dell', 100.00),
('Teclado', 'Redragon', 380.00);