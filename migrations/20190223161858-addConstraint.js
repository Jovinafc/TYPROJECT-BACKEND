'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   queryInterface.addConstraint('vehicle_transactions',['vehicle_id'],{
       type:'foreign key',
       name: 'vehicle_id_foreign_key',
       references: { //Required field
           table: 'vehicle',
           field: 'vehicle_id'
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
