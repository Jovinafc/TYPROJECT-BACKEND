'use strict';
module.exports = (sequelize, DataTypes) => {
  const avg_rating_accessory = sequelize.define('avg_rating_accessory', {
    accessory_id: {
        type:DataTypes.BIGINT,
        primaryKey:true
    },
    avg_rating: DataTypes.FLOAT
  }, {});
  avg_rating_accessory.associate = function(models) {
    avg_rating_accessory.belongsTo(models.accessory,{foreignKey:"accessory_id"})
    avg_rating_accessory.belongsTo(models.accessory_rating,{foreignKey:"accessory_id"})
  };
  return avg_rating_accessory;
};