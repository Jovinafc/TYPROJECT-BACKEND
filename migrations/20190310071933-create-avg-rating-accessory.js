'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avg_rating_accessories', {
        accessory_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avg_rating: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('avg_rating_accessories');
  }
};