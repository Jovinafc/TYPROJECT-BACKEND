'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      queryInterface.addColumn(
          "vehicle_transactions",
          "user_id",
          Sequelize.BIGINT,

      )


        queryInterface.addConstraint("vehicle_transactions",["user_id"],{
            type:"foreign key",
            name:"user_id",
            references:{
                table: 'user_id',
                field: 'user_id'
            }

        })

 

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
