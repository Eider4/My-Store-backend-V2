import { Op } from "sequelize";
import Product from "../../../domain/Products.js";

class ProductRepository {
  async getProducts() {
    const products = await Product.findAll();
    return products;
  }
  async getProductById(id) {
    const product = await Product.findByPk(id);
    return product;
  }
  async getProductsFiltered(filter) {
    const products = await Product.findAll({
      where: {
        title: {
          [Op.iLike]: `%${filter}%`,
        },
      },
    });
    return products;
  }
  async addProduct(product) {
    const productCreated = await Product.create(product);
    return productCreated;
  }
  async updateProduct(id, product) {
    const updated = await Product.update(product, {
      where: { id_product: id },
    });
    return updated;
  }
  async deleteProduct(id) {
    const deleted = await Product.destroy({ where: { id_product: id } });
    return deleted;
  }
}

export default ProductRepository;
