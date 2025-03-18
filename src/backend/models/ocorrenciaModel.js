// models/ocorrenciaModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';
import { User } from './user.js';

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
});

Ocorrencia.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Ocorrencia, { foreignKey: 'userId' });

export default Ocorrencia;