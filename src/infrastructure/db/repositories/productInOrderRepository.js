import ProductInOrder from "../../../domain/ProductInOrder.js";

class ProductInOrderRepository {
  async getProductInOrderById(id) {
    const productInOrder = await ProductInOrder.findByPk(id);
    return productInOrder;
  }
  async addProductInOrder(productInOrder) {
    const [id] = await ProductInOrder.create(productInOrder);
    return id;
  }
  async updateProductInOrder(id, productInOrder) {
    const updated = await ProductInOrder.update(productInOrder, {
      where: { id_product: id },
    });
    return updated;
  }
  async deleteProductInOrder(id) {
    const deleted = await ProductInOrder.destroy({ where: { id_product: id } });
    return deleted;
  }
}

export default ProductInOrderRepository;
