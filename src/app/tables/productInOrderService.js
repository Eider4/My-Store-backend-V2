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

export const updateProductInOrder = async (id, productInOrder) => {
  const updated = await productInOrderRepository.updateProductInOrder(
    id,
    productInOrder
  );
  return updated;
};

export const deleteProductInOrder = async (id) => {
  const deleted = await productInOrderRepository.deleteProductInOrder(id);
  return deleted;
};
