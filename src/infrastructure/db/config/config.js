import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// Configuración de la conexión a PostgreSQL
const NAME_DATABASE = process.env.NAME_DATABASE_URL;
const USER_DATABASE = process.env.USER_DATABASE_URL;
const PASSWORD_DATABASE = process.env.PASSWORD_DATABASE_URL;
const HOST_DATABASE = process.env.HOST_DATABASE_URL;
const PORT_DATABASE = process.env.PORT_DATABASE_URL;

export const sequelize = new Sequelize(
  NAME_DATABASE,
  USER_DATABASE,
  PASSWORD_DATABASE,
  {
    host: HOST_DATABASE,
    dialect: "postgres",
    logging: false, // Desactiva logs en consola
    port: PORT_DATABASE,
  }
);
// Función para sincronizar modelos
export const syncModels = async () => {
  try {
    await sequelize.sync(); // Usa `force: true` SOLO en desarrollo
    console.log("✅ Base de datos sincronizada correctamente");
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
  }
};
