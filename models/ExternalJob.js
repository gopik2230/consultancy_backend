const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ScreeningQuestion = require('./ScreeningQuestion'); 

// Define the InternalJob model
const ExternalJob = sequelize.define('ExternalJob', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  budget_from: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  budget_to: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  experience_from: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  experience_to: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  experience_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hiring_process: {
    type: DataTypes.JSON,
    allowNull: true
  },
  interview_date_from: {
    type: DataTypes.DATE,
    allowNull: true
  },
  interview_date_to: {
    type: DataTypes.DATE,
    allowNull: true
  },
  job_duration_from: {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_duration_to: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notice_period: {
    type: DataTypes.STRING,
    allowNull: true
  },
  priority_skills: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  job_status: {
    type: DataTypes.STRING,
    defaultValue: "open",
    allowNull: false
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'external' // Optional: set default if needed
  }
}, {
  tableName: 'ExternalJobs',
  timestamps: true
});

 // Define the association
 ExternalJob.hasMany(ScreeningQuestion, { foreignKey: 'job_id', as: 'ScreeningQuestions' });

module.exports = ExternalJob;




