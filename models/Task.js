const { DataTypes } = require('sequelize')
const db = require('../database/db');

const { sequelize: taskSequelize, DataTypes: SequelizeDataTypes } = require('../sequelize');

const sequelize = require('../sequelize');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
