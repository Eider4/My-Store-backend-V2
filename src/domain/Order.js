import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import User from "./User.js";

const Order = sequelize.define(
  "Order",
  {
    id_order: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "delivered"),
      defaultValue: "pending",
    },
  },
  { timestamps: false }
);

Order.belongsTo(User, { foreignKey: "id_user" });

export default Order;

const order = {
  id_order: crypto.randomUUID(),
  id_user: "foreign_key_user_id",
  order_date: new Date(),
  total_amount: 199.99,
  status: "Processing",
  shipping_address: "123 Main St, City, Country",
  payment_method: "Credit Card",
  payment_status: "Paid",
  created_at: new Date(),
  updated_at: new Date(),
};
