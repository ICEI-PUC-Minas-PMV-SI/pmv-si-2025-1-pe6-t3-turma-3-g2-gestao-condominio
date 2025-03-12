// server.js
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB as connectMySQL } from './database/mysqlConnection.js';
import router from './routes/router.js';
import { sequelize } from './database/mysqlConnection.js';

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('tiny'));
connectMySQL();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
    console.log('MySQL models synchronized');
});

// Rotas
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Servidor está funcionando corretamente!');
});

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });