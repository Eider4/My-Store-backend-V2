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
    status: {
      type: DataTypes.ENUM(
        "pending",
        "succeeded",
        "shipped",
        "delivered",
        "userCanceled"
      ),
      defaultValue: "pending",
    },
    envio: {
      type: DataTypes.JSON,
      allowNull: false,
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
