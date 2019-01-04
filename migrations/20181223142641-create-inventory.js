'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('inventories', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      product_name: {
        type: Sequelize.STRING
      },
        product_type: {
            type: Sequelize.STRING
        },
        vehicle_type: {
            type: Sequelize.STRING
        },

      Quantity: {
        type: Sequelize.BIGINT
      },
      Price: {
        type: Sequelize.BIGINT
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
    return queryInterface.dropTable('inventories');
  }
};