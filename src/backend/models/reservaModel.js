import { DataTypes } from 'sequelize';
import { sequelize } from '../database/mysqlConnection.js';
import { User } from './user.js';

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
        defaultValue: "Ativo", 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,  
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    timestamps: true,
});

Reserva.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

User.hasMany(Reserva, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

export default Reserva;
