'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * 
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const transaction = await queryInterface.sequelize.transaction();
    try {
      // 1. Add the column as nullable first
      await queryInterface.addColumn(
        'InternalJobs',
        'job_type',
        {
          type: Sequelize.STRING,
          allowNull: true // Initially nullable
        },
        { transaction }
      );

      // 2. Set default value for existing records
      await queryInterface.sequelize.query(
        `UPDATE InternalJobs SET job_type = 'internal' WHERE job_type IS NULL`,
        { transaction }
      );

      // 3. Change the column to be required
      await queryInterface.changeColumn(
        'InternalJobs',
        'job_type',
        {
          type: Sequelize.STRING,
          allowNull: false // Now required
        },
        { transaction }
      );

      // Commit the transaction
      await transaction.commit();
    } catch (err) {
      // If anything fails, rollback
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('InternalJobs', 'job_type');
  }
};
