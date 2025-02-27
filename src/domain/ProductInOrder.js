import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import Order from "./Order.js";
import Product from "./Products.js";

const ProductInOrder = sequelize.define(
  "ProductInOrder",
  {
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Order, key: "id" },
      primaryKey: true, // Clave primaria compuesta
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Product, key: "id" },
      primaryKey: true, // Clave primaria compuesta
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    unit_price: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
    discounted_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      get() {
        const unitPrice = this.getDataValue("unit_price");
        const discount = this.getDataValue("discount");
        return unitPrice * (1 - discount / 100);
      },
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      get() {
        const discountedPrice = this.getDataValue("discounted_price");
        const quantity = this.getDataValue("quantity");
        return discountedPrice * quantity;
      },
    },
  },
  { timestamps: false }
);

Order.belongsToMany(Product, {
  through: ProductInOrder,
  foreignKey: "id_order",
});
Product.belongsToMany(Order, {
  through: ProductInOrder,
  foreignKey: "id_product",
});

export default ProductInOrder;

const productInOrder = {
  id_order: "foreign_key_order_id", // ID de la orden a la que pertenece el producto
  id_product: "foreign_key_product_id", // ID del producto comprado
  quantity: 2, // Cantidad de productos comprados
  unit_price: 199, // Precio unitario del producto en el momento de la compra
  discount: 10, // Porcentaje de descuento aplicado al producto
  discounted_price: 179.1, // Precio después del descuento (unit_price * (1 - discount/100))
  total_price: 358.2, // Precio total (quantity * discounted_price)
};
