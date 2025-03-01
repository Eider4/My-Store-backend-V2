import { DataTypes } from "sequelize";
import { sequelize } from "../infrastructure/db/config/config.js";

const Product = sequelize.define(
  "Product",
  {
    id_product: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discount: { type: DataTypes.FLOAT, defaultValue: 0 },
    category: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false }, // Nombre de la marca
    warranty: { type: DataTypes.STRING, allowNull: false }, // Garantía
    rating: { type: DataTypes.ARRAY(DataTypes.FLOAT), allowNull: true }, // Puntuación del producto (0-5) o null
    launch_date: { type: DataTypes.DATE, allowNull: false }, // Fecha de lanzamiento
    origin: { type: DataTypes.STRING, allowNull: false },
    images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    especificaciones: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    envio: {
      // Datos de envío del producto
      type: DataTypes.JSON,
      allowNull: false,
    },
    comments: {
      // Datos de comentarios del producto
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
  },
  { timestamps: true }
);

// posibles mejoras:
// 1. agregar la cantidad de productos disponibles en la tienda

export default Product;
