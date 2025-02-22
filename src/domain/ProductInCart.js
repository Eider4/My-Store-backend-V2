import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import Cart from "./Cart.js";
import Product from "./Products.js";

const ProductInCart = sequelize.define(
  "ProductInCart",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  { timestamps: false }
);

Cart.belongsToMany(Product, { through: ProductInCart, foreignKey: "id_cart" });
Product.belongsToMany(Cart, {
  through: ProductInCart,
  foreignKey: "id_product",
});

export default ProductInCart;

const productInCart = {
  id_cart: "foreign_key_cart_id",
  id_product: "foreign_key_product_id",
  quantity: 2,
};
