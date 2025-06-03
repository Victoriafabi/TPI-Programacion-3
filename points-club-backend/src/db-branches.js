import { Sequelize } from 'sequelize';

export const sequelizeBranches = new Sequelize({
    dialect: 'sqlite',
    storage: './branches.db',
});