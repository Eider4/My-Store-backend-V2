import ProductInOrderRepository from "../../infrastructure/db/repositories/productInOrderRepository.js";

const productInOrderRepository = new ProductInOrderRepository();

export const getProductInOrderById = async (id) => {
  const productInOrder = await productInOrderRepository.getProductInOrderById(
    id
  );
  return productInOrder;
};

export const addProductInOrder = async (productInOrder) => {
  const id = await productInOrderRepository.addProductInOrder(productInOrder);
  return id;
};
export const getProductsInOrder = async (id_order) => {
  const productsInOrder = await productInOrderRepository.getProductsInOrder(
    id_order
  );
  return productsInOrder;
};

export const updateProductInOrder = async (productInOrder) => {
  const updated = await productInOrderRepository.updateProductInOrder(
    productInOrder
  );
  return updated;
};

export const deleteProductInOrder = async (id) => {
  const deleted = await productInOrderRepository.deleteProductInOrder(id);
  return deleted;
};
