import ProductInCart from "../../../domain/ProductInCart.js";
import CartRepository from "./cartRepository.js";

class ProductInCartRepository {
  async gatProductsInCartByIdUser(id_user) {
    const cartEstance = new CartRepository();
    const { id_cart } = await cartEstance.getCartByIdUser(id_user);
    if (!id_cart) {
      return [];
    }
    const productInCart = await ProductInCart.findAll({
      where: { id_cart: id_cart },
    });
    return productInCart;
  }
  async addProductInCart(productInCart) {
    const id = await ProductInCart.create(productInCart);
    return id;
  }

  async deleteProductInCart(data) {
    const { id_cart, id_product } = data;
    const deleted = await ProductInCart.destroy({
      where: { id_cart: id_cart, id_product: id_product },
    });
    return deleted;
  }
  async deleteProductsAllInCart(id_cart) {
    const deleted = await ProductInCart.destroy({
      where: { id_cart: id_cart },
    });
    return deleted;
  }
  async updateProductInCart(data) {
    const { id_product, quantity, id_cart } = data;
    const updated = await ProductInCart.update(
      { quantity: quantity },
      {
        where: { id_product: id_product, id_cart: id_cart },
      }
    );
    return updated;
  }
}

export default ProductInCartRepository;
