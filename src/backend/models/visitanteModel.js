import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';
import { User } from './user.js';

const Visitante = sequelize.define('Visitante', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome é obrigatório.' },
    },
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Este documento já está cadastrado.' },
    validate: {
      notEmpty: { msg: 'O documento é obrigatório.' },
      len: { args: [6, 20], msg: 'O documento deve ter entre 6 e 20 caracteres.' },
    },
  },
  apartamento: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O apartamento é obrigatório.' },
    },
  },
  data: {  
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'A data da visita é obrigatória.' },
      isDate: { msg: 'A data da visita deve ser uma data válida.' },
    },
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
  onUpdate: 'CASCADE',
});

User.hasMany(Visitante, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Visitante;
