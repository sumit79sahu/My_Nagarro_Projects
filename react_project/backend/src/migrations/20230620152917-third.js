'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('categories', {
      categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryImage: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      ,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};
