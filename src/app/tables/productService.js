import ProductRepository from "../../infrastructure/db/repositories/productRepository.js";

const productRepository = new ProductRepository();

export const getProducts = async () => {
  const products = await productRepository.getProducts();
  return products;
};

export const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  return product;
};

export const getProductsFiltered = async (filter) => {
  const products = await productRepository.getProductsFiltered(filter);
  return products;
};

export const addProduct = async (product) => {
  const id = await productRepository.addProduct(product);
  return id;
};

export const updateProduct = async (id, product) => {
  const updated = await productRepository.updateProduct(id, product);
  return updated;
};
