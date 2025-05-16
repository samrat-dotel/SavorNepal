import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user', // default role is 'user'
        validate: {
            isIn: [['user', 'admin']] // restrict values to 'user' or 'admin'
        }
    }
}, {
    tableName: 'users',
    timestamps: false,
});

export default User;
