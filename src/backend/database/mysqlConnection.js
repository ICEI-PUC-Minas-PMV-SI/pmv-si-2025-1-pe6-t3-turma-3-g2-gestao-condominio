// database/mysqlConnection.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export { sequelize, connectDB };