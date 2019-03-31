'use strict';
module.exports = (sequelize, DataTypes) => {
  const accessory = sequelize.define('accessory', {
    accessory_id:{
        type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
      accessory_name: DataTypes.STRING,
      accessory_image: DataTypes.STRING,
      accessory_details: DataTypes.STRING,
      accessory_type:DataTypes.STRING,
      accessory_price: DataTypes.BIGINT,
      accessory_use: DataTypes.STRING,
      accessory_qty:DataTypes.BIGINT
  }, {});
  accessory.associate = function(models) {
  accessory.hasMany(models.cart_storage,{foreignKey:'accessory_id'})
      accessory.hasMany(models.accessory_transaction,{foreignKey:'accessory_id'})
      accessory.hasMany(models.accessory_rating,{foreignKey:'accessory_id'})
      accessory.hasMany(models.avg_rating_accessory,{foreignKey:'accessory_id'})

  };
  return accessory;
};