// db.js
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance and connect to the MySQL database
const sequelize = new Sequelize('consultancy', 'root', 'Gopi@12345', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
