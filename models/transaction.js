'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    transaction_id:{type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true},
   client_id: {
        type:DataTypes.BIGINT,
       references:{
            model:"client",
           key:"client_id"
       }
   },
   vehicle_id: {
        type:DataTypes.BIGINT,
       references: {
            model:"vehicle",
           key:"vehicle_id"
       }

   },
    date: DataTypes.DATE,
    type: DataTypes.STRING
  }, {underscore:true});
  transaction.associate = function(models) {
    // associations can be defined here
  };
  return transaction;
};