"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ratings", {
      rateId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rate: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      comment: {
        type: Sequelize.STRING,
      },

      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "productId",
        },
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ratings");
  },
};
