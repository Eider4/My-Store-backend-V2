import Cart from "../../../domain/Cart.js";

class CartRepository {
  async getCartById(id) {
    const cart = await Cart.findByPk(id);
    return cart;
  }
  async getCartByIdUser(id_user) {
    const cart = await Cart.findOne({
      where: { id_user: id_user },
    });
    return cart;
  }
  async addCart(cart) {
    const cartNew = await Cart.create(cart);
    return cartNew;
  }
  async updateCart(id, cart) {
    const updated = await Cart.update(cart, {
      where: { id_cart: id },
    });
    return updated;
  }
  async deleteCart(id) {
    const deleted = await Cart.destroy({ where: { id_cart: id } });
    return deleted;
  }
}

export default CartRepository;
