const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InternalJob = sequelize.define('InternalJob', {
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
    type: DataTypes.STRING,
    allowNull: false
  },
  budget_to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expeirence_from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expeirence_to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hiring_process: {
    type: DataTypes.JSON,
    allowNull: false
  },
  interview_date_from: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  interview_date_to: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  job_duration_from: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  job_duration_to: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  notice_period: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority_skills: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

// Add the reverse association for `hasMany`
InternalJob.associate = models => {
  InternalJob.hasMany(models.ScreeningQuestion, {
    foreignKey: 'job_id',
    as: 'screeningQuestions' // Alias for the related ScreeningQuestions
  });
};

module.exports = InternalJob;
