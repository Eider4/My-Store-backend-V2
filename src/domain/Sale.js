import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import Order from "./Order.js";

const Sale = sequelize.define(
  "Sale",
  {
    id_sale: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sale_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.FLOAT, allowNull: false },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "paypal", "crypto"),
      allowNull: false,
    },
  },
  { timestamps: false }
);

Sale.belongsTo(Order, { foreignKey: "id_order" });

export default Sale;

const sale = {
  id_sale: crypto.randomUUID(),
  id_order: "foreign_key_order_id",
  sale_date: new Date(),
  total_amount: 199.99,
  payment_method: "Credit Card",
  shipping_status: "Shipped",
  payment_status: "Paid",
  created_at: new Date(),
};
