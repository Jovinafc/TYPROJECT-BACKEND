'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('helpful_vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feedback_id: {
        type: Sequelize.BIGINT,

      },
      user_id: {
        type: Sequelize.BIGINT
      },
        vehicle_id:{
            type: Sequelize.BIGINT
        },
      helpful: {
        type: Sequelize.STRING
      },
      not_helpful: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('helpful_vehicles');
  }
};