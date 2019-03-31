'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicle_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.BIGINT
      },
      owner_id: {
        type: Sequelize.BIGINT,
          references:{
              model:"owners",
              key:"owner_id"
          }
      },
      vehicle_id: {
        type: Sequelize.BIGINT,
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
        amount:{
          type:Sequelize.DOUBLE
        },
      status: {
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
    return queryInterface.dropTable('vehicle_transactions');
  }
};