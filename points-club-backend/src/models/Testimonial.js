import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Testimonial = sequelize.define("Testimonial", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});
