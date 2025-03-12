// models/ocorrenciaModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';

const Ocorrencia = sequelize.define('Ocorrencia', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Ocorrencia;