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

const order = {
  id_order: crypto.randomUUID(),
  id_user: "foreign_key_user_id",
  order_date: new Date(),
  total_amount: 199.99,
  statusPayment: "Processing",
  status: "Processing",
  address: {
    state: "Cauca",
    zip: "193520",
    city: "Timbio",
    address: "B. San carlos 19N Cr8 - 98",
    optional: "Es un casa blanca",
  },
  transfer_data: {
    id: "ch_3Qw5QzQ8c2aNcIJp0xpHl3kV",
    balance_transaction: "txn_3Qw5QzQ8c2aNcIJp06dmHAIR",
    outcome: {
      network_status: "approved_by_network",
      reason: null,
    },
    payment_method_details: {
      card: {
        brand: "visa",
        country: "US",
        exp_month: 4,
        exp_year: 2044,
        last4: "4242",
        funding: "credit",
        fingerprint: "0HVSDJniqnUHGVUq",
        wallet: null,
      },
      amazon_pay: { funding: [Object] },
      cashapp: { buyer_id: "test_buyer_id", cashtag: "$test_cashtag" },
      type: "card" || "amazon_pay" || "cashapp",
    },
    receipt_url: "",
    status: "succeeded",
  },
  created_at: new Date(),
  updated_at: new Date(),
};
