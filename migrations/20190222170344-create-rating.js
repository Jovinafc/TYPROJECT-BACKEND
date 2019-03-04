'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ratings', {
      rating_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },

      vehicle_id: {
        type: Sequelize.BIGINT,
          references: {
            model:"vehicle",
              key:"vehicle_id" 
          },
          primaryKey: true
      },
        user_id: {
            type: Sequelize.BIGINT,
            references:{
                model:"users",
                key:"user_id"
            },
            primaryKey: true
        },


      vehicle_name: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      rating_number: {
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
    return queryInterface.dropTable('ratings');
  }
};