import { DataTypes } from "sequelize";
import { sequelize } from "../db-club";

export const User = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    apellido: {
        type:DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail : true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    puntos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    timestamps: false,

});