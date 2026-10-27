const productsModel = require("../models/productsModel");

const allowedFields = [
  "name",
  "description",
  "price",
  "stockQuantity",
  "minimumQuantity",
  "categoryId"
];

function checkId(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}

function checkData(data, { full = false } = {}) {
  const errors = [];
  const received = Object.keys(data);
  const unknowns = received.filter((field) => !allowedFields.includes(field));

  if (unknowns.length) {
    errors.push(`Field(s) not allowed: ${unknowns.join(", ")}.`);
  }

  if (full) {
    for (const field of ["name", "price", "stockQuantity", "minimumQuantity", "categoryId"]) {
      if (data[field] === undefined) errors.push(`The field '${field}' is required.`);
    }
  } else if (received.length === 0) {
    errors.push("Provide at least one field to update");
  }

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length === 0) {
      errors.push("Name is required and must be a non-empty string");
    } else if (data.name.trim().length > 150) {
      errors.push("Name must have a maximum of 150 characters.");
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      errors.push("Description must be a text or null");
    } else if (data.description.length > 500) {
      errors.push("Description must be a maximum of 500 characters");
    }
  }

  if (data.price !== undefined &&
      (typeof data.price !== "number" || !Number.isFinite(data.price) || data.price <= 0)) {
    errors.push("Price must be a number greater than zero");
  }

  for (const field of ["stockQuantity", "minimumQuantity"]) {
    if (data[field] !== undefined &&
        (!Number.isInteger(data[field]) || data[field] < 0)) {
      errors.push(`O field '${field}' must be a non-negative integer`);
    }
  }

  if (data.categoryId !== undefined &&
      (!Number.isInteger(data.categoryId) || data.categoryId <= 0)) {
    errors.push("Category ID must be a positive integer.");
  }

  return errors;
}

function normalizeData(data) {
  const result = { ...data };
  if (typeof result.name === "string") result.name = result.name.trim();
  if (typeof result.description === "string") result.description = result.description.trim();
  return result;
}

async function checkCategoryIfProvided(data) {
  if (data.categoryId !== undefined) {
    const exists = await productsModel.existingCategory(data.categoryId);
    if (!exists) {
      const error = new Error("The specified category does not exist");
      error.status = 400;
      throw error;
    }
  }
}

async function getAllProducts(req, res, next) {
  try {
    const { categoryId, status } = req.query;
    
    if (categoryId !== undefined && status !== undefined) {
      return res.status(400).json({
        error: "Use only one filter per request: categoryId or status"
      });
    }

    let categoryIdNumber;
    if (categoryId !== undefined) {
      if (!/^\d+$/.test(categoryId) || Number(categoryId) <= 0) {
        return res.status(400).json({ error: "Category ID must be a positive integer" });
      }
      categoryIdNumber = Number(categoryId);
      const exists = await productsModel.existingCategory(categoryIdNumber);
      if (!exists) return res.status(404).json({ error: "Category not found" });
    }

    const validStatus = ["normal_stock", "low_stock", "out_of_stock"];
    if (status !== undefined && !validStatus.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Use: ${validStatus.join(", ")}.`
      });
    }

    const products = await productsModel.getAllProducts({
      categoryId: categoryIdNumber,
      status
    });
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    if (!checkId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const produto = await productsModel.getProductById(Number(req.params.id));
    if (!produto) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Send a JSON object containing the product data" });
    }

    const errors = checkData(req.body, { full: true });
    if (errors.length) return res.status(400).json({ errors });

    const data = normalizeData(req.body);
    await checkCategoryIfProvided(data);

    const produto = await productsModel.createProduct(data);
    return res.status(201).json(produto);
  } catch (error) {
    next(error);
  }
}

async function parcialUpdateProduct(req, res, next) {
  try {
    if (!checkId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const id = Number(req.params.id);
    const existente = await productsModel.getProductById(id);
    if (!existente) return res.status(404).json({ error: "Product not found" });

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Send a JSON object containing the product data" });
    }

    const errors = checkData(req.body, { full: false });
    if (errors.length) return res.status(400).json({ errors });

    const data = normalizeData(req.body);
    await checkCategoryIfProvided(data);

    const produto = await productsModel.updateProduct(id, data);
    return res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
}

async function fullUpdateProduct(req, res, next) {
  try {
    if (!checkId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const id = Number(req.params.id);
    const existente = await productsModel.getProductById(id);
    if (!existente) return res.status(404).json({ error: "Product not found" });

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ error: "Send a JSON object containing the product data" });
    }

    const errors = checkData(req.body, { full: true });
    if (errors.length) return res.status(400).json({ errors });

    const data = normalizeData(req.body);
    await checkCategoryIfProvided(data);

    const produto = await productsModel.updateProduct(id, data);
    return res.status(200).json(produto);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    if (!checkId(req.params.id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const excluido = await productsModel.deleteProduct(Number(req.params.id));
    if (!excluido) return res.status(404).json({ error: "Product not found" });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  fullUpdateProduct,
  parcialUpdateProduct,
  deleteProduct
};
