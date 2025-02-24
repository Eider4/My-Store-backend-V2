import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";

const User = sequelize.define(
  "User",
  {
    id_user: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue: "customer",
    },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: {
      type: DataTypes.JSONB, // Usamos JSONB para mejor eficiencia en PostgreSQL
      allowNull: true,
      defaultValue: {
        state: "",
        zip: "",
        city: "",
        address: "",
        optional: "",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  { timestamps: false }
);

export default User;
