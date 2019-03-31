'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.DOUBLE
      },
      DOB: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
        image:{
          type:Sequelize.STRING
        },
        address:{
          type:Sequelize.STRING
        },
        state:{
          type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        },
        pincode:{
            type:Sequelize.STRING
        },
        documents:{
          type:Sequelize.STRING
        },
        bank_account_no:{
          type:Sequelize.STRING
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
    return queryInterface.dropTable('users');
  }
};