import ProductInCart from "../../../domain/ProductInCart.js";
import CartRepository from "./cartRepository.js";

class ProductInCartRepository {
  async gatProductsInCartByIdUser(id_user) {
    const cartEstance = new CartRepository();
    const cart = await cartEstance.getCartByIdUser(id_user);
    if (!cart) {
      return [];
    }
    const productInCart = await ProductInCart.findAll({
      where: { id_cart: cart.id_cart },
    });
    return productInCart;
  }
  async addProductInCart(productInCart) {
    const [product, created] = await ProductInCart.findOrCreate({
      where: {
        id_cart: productInCart.id_cart,
        id_product: productInCart.id_product,
      },
      defaults: {
        quantity: productInCart.quantity,
      },
    });

    return product;
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
