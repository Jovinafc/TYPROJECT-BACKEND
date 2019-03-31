'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
      queryInterface.addConstraint("ratings",["vehicle_id"],{
          type:"foreign key",
          name:"fk_ratings_vehicle_transactions",
          references:{
              table:"vehicle_transactions",
              field:"vehicle_id"
          }
      }),
      queryInterface.addConstraint("feedbacks",["vehicle_id"],{
          type:"foreign key",
          name:"fk_feedbacks_vehicle_transactions",
          references:{
              table:"vehicle_transactions",
              field:"vehicle_id"
          }
      })
  ])

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
