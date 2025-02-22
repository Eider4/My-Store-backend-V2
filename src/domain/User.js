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
    address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    phone: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false }
);

export default User;
const user = {
  id_user: crypto.randomUUID(), // Unique identifier for the user
  name: "John Doe",
  email: "john.doe@example.com",
  password: "hashed_password",
  address: {
    street: "123 Main St",
    city: "City",
    state: "State",
    zip: "12345", // codigo postal
    country: "Country",
  },
  phone: "+1234567890",
  created_at: new Date(),
  updated_at: new Date(),
};
