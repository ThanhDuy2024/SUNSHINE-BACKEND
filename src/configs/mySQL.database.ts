import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(String(process.env.DATABASE_NAME), 'root', String(process.env.DATABASE_PASSWORD), {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}