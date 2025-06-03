import { DataTypes } from "sequelize";
import { sequelizeClub } from "../db-club.js";

export const Record = sequelizeClub.define("Record", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaCanje: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    qr: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    timestamps: false
});
