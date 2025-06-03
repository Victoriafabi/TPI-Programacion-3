import { DataTypes } from 'sequelize';
import { sequelizeBranches } from '../db-branches.js';

export const Branch = sequelizeBranches.define('Branch', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hours: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mapUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {   
    timestamps: false
});
