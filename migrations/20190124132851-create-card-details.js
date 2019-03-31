'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('card_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_no: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      cvv: {
        type: Sequelize.INTEGER
      },
      expiry_date: {
        type: Sequelize.STRING
      },
      bank_account_no: {
        type: Sequelize.STRING,
          allowNull: false
      },
      mobile_no: {
        type: Sequelize.DOUBLE,
          allowNull: false
      },
      funds: {
        type: Sequelize.DOUBLE,
          allowNull: false
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
    return queryInterface.dropTable('card_details');
  }
};