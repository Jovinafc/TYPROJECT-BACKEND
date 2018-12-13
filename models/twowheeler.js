'use strict';
module.exports = (sequelize, DataTypes) => {
  const twoWheeler = sequelize.define('twoWheeler', {
   id:{type:DataTypes.BIGINT,
       allowNull: false,
       autoIncrement: true,
       primaryKey: true},
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    fuel: DataTypes.STRING
  }, {});
  twoWheeler.associate = function(models) {
    // associations can be defined here
  };
  return twoWheeler;
};