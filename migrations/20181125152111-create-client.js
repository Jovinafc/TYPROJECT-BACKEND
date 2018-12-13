'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      client_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
       vehicle_id:{
          type:Sequelize.BIGINT,
           references:{
              model:"vehicle",
               key:"vehicle_id"
           }
       },
        user_id:{
            type: Sequelize.BIGINT,
            references:{
                model:"users",
                key:"user_id"

            }
        },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.DOUBLE
      },
      mobile_no: {
        type: Sequelize.DOUBLE
      },
      email: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      documents: {
        type: Sequelize.BLOB
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
    return queryInterface.dropTable('clients');
  }
};