'use strict';
module.exports = (sequelize, DataTypes) => {
  const accessory_transaction = sequelize.define('accessory_transaction', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
    user_id: DataTypes.BIGINT,
    accessory_id: DataTypes.BIGINT,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  accessory_transaction.associate = function(models) {
    // associations can be defined here
  };
  return accessory_transaction;
};