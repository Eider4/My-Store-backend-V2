import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";
import User from "./User.js";

const Order = sequelize.define(
  "Orders",
  {
    id_order: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
    order_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    total_amount: { type: DataTypes.FLOAT, allowNull: false },
    statuspayment: {
      type: DataTypes.ENUM(
        "Pending",
        "Processing",
        "Completed",
        "Failed",
        "succeeded"
      ),
      defaultValue: "Pending",
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
    address: {
      type: DataTypes.JSON, // Almacena la dirección completa como JSON
      allowNull: false,
    },
    transfer_data: {
      type: DataTypes.JSON, // Almacena los detalles de pago como JSON
      allowNull: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);

// Relación con User
Order.belongsTo(User, { foreignKey: "id_user" });

export default Order;
