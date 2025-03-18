import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';

const Morador = sequelize.define("Morador", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apartamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloco: {   
    type: DataTypes.STRING,
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: true, // cria automaticamente createdAt e updatedAt
});

export default Morador;