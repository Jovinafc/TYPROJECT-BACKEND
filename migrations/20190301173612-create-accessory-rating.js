'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accessory_ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.BIGINT,
          references: {
            model:"users",
            key:"user_id"
          }
      },
      accessory_id: {
        type: Sequelize.BIGINT,
          references:{
            model:"accessories",
            key:"accessory_id"
          }
      },
      rating: {
        type: Sequelize.BIGINT
      },
      review: {
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
    return queryInterface.dropTable('accessory_ratings');
  }
};