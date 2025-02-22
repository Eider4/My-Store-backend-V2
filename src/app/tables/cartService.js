import CartRepository from "../../infrastructure/db/repositories/cartRepository.js";

const cartRepository = new CartRepository();

export const getCartById = async (id) => {
  const cart = await cartRepository.getCartById(id);
  return cart;
};

export const addCart = async (cart) => {
  const id = await cartRepository.addCart(cart);
  return id;
};

export const updateCart = async (id, cart) => {
  const updated = await cartRepository.updateCart(id, cart);
  return updated;
};

export const deleteCart = async (id) => {
  const deleted = await cartRepository.deleteCart(id);
  return deleted;
};
