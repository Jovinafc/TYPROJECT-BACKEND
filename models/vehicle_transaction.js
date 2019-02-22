'use strict';
module.exports = (sequelize, DataTypes) => {
  const vehicle_transaction = sequelize.define('vehicle_transaction', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
    client_id: DataTypes.BIGINT,
    owner_id: DataTypes.BIGINT,
    vehicle_id: DataTypes.BIGINT,
    transaction_type: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  vehicle_transaction.associate = function(models) {
    // associations can be defined here
  };
  return vehicle_transaction;
};