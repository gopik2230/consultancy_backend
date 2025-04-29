// models/CompanyProfile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the CompanyProfile model
const CompanyProfile = sequelize.define('CompanyProfile', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', 
            key: 'id'
        }
    },
  client_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_size: {
    type: DataTypes.STRING,
    allowNull: true
  },
  about: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = CompanyProfile;
