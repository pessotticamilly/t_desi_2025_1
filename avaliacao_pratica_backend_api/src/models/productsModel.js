const db = require("../config/database/connection");

const allowedFields = {
  name: "name",
  description: "description",
  price: "price",
  stockQuantity: "stock_quantity",
  minimumQuantity: "minimum_quantity",
  categoryId: "category_id"
};

const baseSelect = `
  SELECT p.id, p.name, p.description, p.price, p.stock_quantity, p.minimum_quantity, p.category_id, p.created_in, p.updated_in, c.name AS category_name,
    CASE
      WHEN p.stock_quantity = 0 THEN 'out_of_stock'
      WHEN p.stock_quantity <= p.minimum_quantity THEN 'low_stock'
      ELSE 'normal_stock'
    END AS stock_status
  FROM products p
  INNER JOIN categories c ON c.id = p.category_id
`;

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    stockQuantity: row.stock_quantity,
    minimumQuantity: row.minimum_quantity,
    categoryId: row.category_id,
    categoryName: row.category_name,
    stockStatus: row.stock_status,
    createdIn: row.created_in,
    updatedIn: row.updated_in
  };
}

async function existingCategory(categoryId) {
  const [rows] = await db.execute("SELECT id FROM categories WHERE id = ?", [categoryId]);
  return rows.length > 0;
}

async function getAllProducts({ categoryId, status }) {
  const conditions = [];
  const values = [];

  if (categoryId !== undefined) {
    conditions.push("p.category_id = ?");
    values.push(categoryId);
  }

  if (status !== undefined) {
    if (status === "out_of_stock") {
      conditions.push("p.stock_quantity = 0");
    } else if (status === "low_stock") {
      conditions.push("p.stock_quantity > 0 AND p.stock_quantity <= p.minimum_quantity");
    } else if (status === "normal_stock") {
      conditions.push("p.stock_quantity > p.minimum_quantity");
    }
  }

  const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await db.execute(`${baseSelect}${where} ORDER BY p.id`, values);
  return rows.map(mapProduct);
}

async function getProductById(id) {
  const [rows] = await db.execute(`${baseSelect} WHERE p.id = ?`, [id]);
  return rows.length ? mapProduct(rows[0]) : null;
}

async function createProduct(data) {
  const sql = `
    INSERT INTO products
      (name, description, price, stock_quantity, minimum_quantity, category_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.name,
    data.description ?? null,
    data.price,
    data.stockQuantity,
    data.minimumQuantity,
    data.categoryId
  ];
  const [result] = await db.execute(sql, values);
  return getProductById(result.insertId);
}

async function updateProduct(id, data) {
  const chaves = Object.keys(data);
  if (chaves.length === 0) return getProductById(id);

  const colunas = chaves.map((key) => allowedFields[key]);
  const atribuicoes = colunas.map((column) => `${column} = ?`).join(", ");
  const values = chaves.map((key) => data[key]);
  values.push(id);

  await db.execute(`UPDATE products SET ${atribuicoes} WHERE id = ?`, values);
  return getProductById(id);
}

async function deleteProduct(id) {
  const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllProducts,
  getProductById,
  existingCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  allowedFields
};
