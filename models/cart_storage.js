'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart_storage = sequelize.define('cart_storage', {
      user_id: DataTypes.BIGINT,
    accessory_id:DataTypes.BIGINT,
    quantity:DataTypes.BIGINT
  }, {});
  cart_storage.associate = function(models) {
    // associations can be defined here
  };
  return cart_storage;
};