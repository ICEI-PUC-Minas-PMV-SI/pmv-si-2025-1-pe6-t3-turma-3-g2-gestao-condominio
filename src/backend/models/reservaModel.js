import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';

const Reserva = sequelize.define("Reserva", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "ativo",
  },
}, {
  timestamps: true, // cria automaticamente createdAt e updatedAt
});

export default Reserva;
