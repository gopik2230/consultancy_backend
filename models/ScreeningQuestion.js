const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const InternalJob = require('./InternalJob');

// Define the ScreeningQuestion model
const ScreeningQuestion = sequelize.define('ScreeningQuestion', {
  question: {
    type: DataTypes.STRING,
    allowNull: true
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  answerType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  job_type: {
    type: DataTypes.STRING,
    allowNull: false // 'internal' or 'external'
  }
}, {
  tableName: 'ScreeningQuestions',
  timestamps: true
});

module.exports = ScreeningQuestion;
