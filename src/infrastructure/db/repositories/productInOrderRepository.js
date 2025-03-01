import ProductInOrder from "../../../domain/ProductInOrder.js";

class ProductInOrderRepository {
  async getProductInOrderById(id) {
    const productInOrder = await ProductInOrder.findByPk(id);
    return productInOrder;
  }
  async addProductInOrder(productInOrder) {
    const id = await ProductInOrder.create(productInOrder);
    return id;
  }
  async getProductsInOrder(id_order) {
    const productsInOrder = await ProductInOrder.findAll({
      where: { id_order: id_order },
    });
    return productsInOrder;
  }
  async updateProductInOrder(productInOrder) {
    console.log("Esto es lo que le llegaaaaaaa ", productInOrder.status);
    const updated = await ProductInOrder.update(productInOrder, {
      where: {
        id_product: productInOrder.id_product,
        id_order: productInOrder.id_order,
      },
    });
    return updated;
  }
  async deleteProductInOrder(id) {
    const deleted = await ProductInOrder.destroy({ where: { id_product: id } });
    return deleted;
  }
}

export default ProductInOrderRepository;
