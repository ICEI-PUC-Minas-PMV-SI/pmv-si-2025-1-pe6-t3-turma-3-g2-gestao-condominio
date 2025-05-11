import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';
import { User } from './user.js';

const Visitante = sequelize.define('Visitante', {
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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ativo',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Visitante.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'SET NULL',
});

User.hasMany(Visitante, {
  foreignKey: 'userId',
});

export default Visitante;
