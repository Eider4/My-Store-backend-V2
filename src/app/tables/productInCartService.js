import CartRepository from "../../infrastructure/db/repositories/cartRepository.js";
import ProductInCartRepository from "../../infrastructure/db/repositories/productInCartRepository.js";

const productInCartRepository = new ProductInCartRepository();
export const getProductInCartByUser = async (id_user) => {
  const productInCart = await productInCartRepository.gatProductsInCartByIdUser(
    id_user
  );
  return productInCart;
};

export const addProductInCart = async (productInCart) => {
  const carInstance = new CartRepository();
  let carExist = await carInstance.getCartByIdUser(productInCart.id_user);
  if (!carExist) {
    carExist = await carInstance.addCart({ id_user: productInCart.id_user });
  }
  const id = await productInCartRepository.addProductInCart({
    id_cart: carExist.id_cart,
    id_product: productInCart.id_product,
    quantity: productInCart.quantity,
  });
  return id;
};

export const deleteProductInCart = async (data) => {
  const deleted = await productInCartRepository.deleteProductInCart(data);
  return deleted;
};

export const deleteProductsAllInCart = async (id_cart) => {
  const deleted = await productInCartRepository.deleteProductsAllInCart(
    id_cart
  );
  return deleted;
};

export const updateProductInCart = async (data) => {
  const updated = await productInCartRepository.updateProductInCart(data);
  return updated;
};
