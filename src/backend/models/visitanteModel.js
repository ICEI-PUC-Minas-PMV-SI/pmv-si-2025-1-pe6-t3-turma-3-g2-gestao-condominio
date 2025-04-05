import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';

const Visitante = sequelize.define("Visitante", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  apartamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataVisita: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Visitante;
