import { Sequelize } from "sequelize";

export const sequelizeClub = new Sequelize({
  dialect: 'sqlite',
  storage: './club.db',
});

