import { DataTypes } from "sequelize";
import { sequelize } from "../database/mysqlConnection.js";
import { User } from "./user.js";

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
}, {
  freezeTableName: true,
  timestamps: true,
});

Morador.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

User.hasOne(Morador, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

export default Morador;