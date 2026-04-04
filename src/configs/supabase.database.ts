import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('/');

export const connectMySupabase = async () => {
    try {
        await sequelize.authenticate();
        // sequelize.sync({alter: true});
        sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}