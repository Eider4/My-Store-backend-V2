import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import User from "./User.js";

const Cart = sequelize.define(
  "Cart",
  {
    id_cart: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

Cart.belongsTo(User, { foreignKey: "id_user" });

export default Cart;
