const { Sequelize } = require('sequelize');

// Replace the following values with your actual database connection details
const sequelize = new Sequelize('task_manager', 'root', 'password1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
