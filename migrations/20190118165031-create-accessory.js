'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accessories', {
        accessory_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT

      },
        accessory_name: {
        type: Sequelize.STRING
      },
        accessory_image: {
        type: Sequelize.STRING
      },
        accessory_details: {
        type: Sequelize.STRING
      },
        accessory_type:{
            type:Sequelize.STRING
        },
        accessory_price: {
        type: Sequelize.BIGINT
      },
        accessory_use: {
        type: Sequelize.STRING
      },
        accessory_qty: {
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
    return queryInterface.dropTable('accessories');
  }
};