CREATE DATABASE IF NOT EXISTS organiza_comercial;
USE organiza_comercial;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(500) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  minimum_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  category_id INT UNSIGNED NOT NULL,
  created_in TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_in TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

INSERT INTO categories (name, description) 
VALUES ('Alimentos', 'Produtos alimentícios'),
  ('Limpeza', 'Produtos para limpeza e higiene do ambiente'),
  ('Papelaria', 'Materiais de escritório e papelaria'),
  ('Eletrônicos', 'Equipamentos e acessórios eletrônicos')
  ON DUPLICATE KEY UPDATE description = VALUES(description);

INSERT INTO products (name, description, price, stock_quantity, minimum_quantity, category_id)
  SELECT 'Caderno universitário', 'Caderno de 10 matérias', 24.90, 20, 5, c.id
  FROM categories c 
  WHERE c.name = 'Papelaria'
    AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Caderno universitário');

INSERT INTO products (name, description, price, stock_quantity, minimum_quantity, category_id)
  SELECT 'Detergente neutro', 'Frasco de 500 ml', 2.99, 4, 8, c.id
  FROM categories c WHERE c.name = 'Limpeza'
    AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Detergente neutro');

INSERT INTO products (name, description, price, stock_quantity, minimum_quantity, category_id)
  SELECT 'Mouse USB', 'Mouse óptico com conexão USB', 39.90, 0, 3, c.id
  FROM categories c WHERE c.name = 'Eletrônicos'
    AND NOT EXISTS (SELECT 1 FROM products p WHERE p.name = 'Mouse USB');