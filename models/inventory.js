'use strict';
module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define('inventory', {
    id: {
        type:DataTypes.BIGINT,
        primaryKey:true,
        allowNull:true
    },
    name: DataTypes.STRING,
    Quantity: DataTypes.BIGINT,
    Price: DataTypes.BIGINT
  }, {});
  inventory.associate = function(models) {
    // associations can be defined here
  };
  return inventory;
};