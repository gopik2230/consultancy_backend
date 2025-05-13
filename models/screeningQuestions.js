// models/ScreeningQuestion.js
module.exports = (sequelize, DataTypes) => {
    const ScreeningQuestion = sequelize.define('ScreeningQuestion', {
      question: {
        type: DataTypes.STRING,
        allowNull: true
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      answerType: {
        type: DataTypes.STRING,
        allowNull: true
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      job_type: {
        type: DataTypes.STRING,
        allowNull: true
      } // 'internal' or 'external'
    });
  
    // Define associations
    ScreeningQuestion.associate = models => {
      // Associate with InternalJob for 'internal' job type
      ScreeningQuestion.belongsTo(models.InternalJob, {
        foreignKey: 'job_id',
        constraints: false,
        as: 'internalJob', // The alias name for the association
        scope: {
          job_type: 'internal'
        }
      });
  
      // Associate with ExternalJob for 'external' job type
      ScreeningQuestion.belongsTo(models.ExternalJob, {
        foreignKey: 'job_id',
        constraints: false,
        as: 'externalJob', // The alias name for the association
        scope: {
          job_type: 'external'
        }
      });
    };
  
    return ScreeningQuestion;
  };
  