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
      accessory_image: DataTypes.BLOB,
      accessory_details: DataTypes.STRING,
      accessory_price: DataTypes.BIGINT,
      accessory_use: DataTypes.STRING
  }, {});
  accessory.associate = function(models) {
  // accessory.hasMany(models.purchase,{foreignKey:'accessory_id'})
  };
  return accessory;
};