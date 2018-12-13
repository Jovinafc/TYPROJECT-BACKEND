'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicle', {
      vehicle_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,

      },
      vehicle_type: {
        type: Sequelize.STRING
      },
        brand: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        fuel_type: {
            type: Sequelize.STRING
        },
      year: {
        type: Sequelize.STRING
      },
        registration_state: {
            type: Sequelize.STRING
        },
      km_driven: {
        type: Sequelize.STRING
      },
      number_plate: {
        type: Sequelize.STRING
      },
      price_per_day: {
        type: Sequelize.BIGINT
      },
      image: {
        type: Sequelize.BLOB
      },
      documents: {
        type: Sequelize.BLOB
      },
      price: {
        type: Sequelize.BIGINT
      },
        description:{
          type:Sequelize.STRING
        },
        status:{
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
    return queryInterface.dropTable('vehicle');
  }
};