import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.mjs';
import Recipe from './recipe.mjs'; // 👉 import Recipe for association

const User = sequelize.define('User', {
      id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],
    },
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
