// // models/User.js
// const { DataTypes, BOOLEAN } = require('sequelize');
// const sequelize = require('../config/db');
// const CompanyProfile = require('./CompanyProfile'); // Import CompanyProfile model

// // Define the User model
// const User = sequelize.define('User', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   linkedin_url: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   website: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   initial_user: {
//     type: BOOLEAN,
//     defaultValue: true
//   },
//   token: {
//     type: DataTypes.STRING,
//   }
// }, {
//   timestamps: true
// });

// // Define the association between User and CompanyProfile
// User.hasOne(CompanyProfile, { foreignKey: 'user_id', as: 'company_profile' });
// CompanyProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// module.exports = User;


// models/User.js
const { DataTypes, BOOLEAN } = require('sequelize');
const sequelize = require('../config/db');
const CompanyProfile = require('./companyProfile');
const Role = require('./role'); // Import Role model

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    }
  },
  linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  initial_user: {
    type: BOOLEAN,
    defaultValue: true
  },
  token: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true
});

// Associations
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id' });

User.hasOne(CompanyProfile, { foreignKey: 'user_id', as: 'company_profile' });
CompanyProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = User;
