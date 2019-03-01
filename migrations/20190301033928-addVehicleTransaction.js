'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addConstraint("vehicle_transactions",["vehicle_id"],
            {
                type:'foreign key',
                name:"fk_rating",
                references:{
                    table:"ratings",
                    field:"vehicle_id"
                }
            }
            ),
        queryInterface.addConstraint("vehicle_transactions",["vehicle_id"],
            {
                type:'foreign key',
                name:"fk_comments",
                references:{
                    table:"feedbacks",
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
