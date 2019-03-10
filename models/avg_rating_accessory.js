'use strict';
module.exports = (sequelize, DataTypes) => {
  const avg_rating_accessory = sequelize.define('avg_rating_accessory', {
    accessory_id: DataTypes.BIGINT,
    avg_rating: DataTypes.BIGINT
  }, {});
  avg_rating_accessory.associate = function(models) {
    // associations can be defined here
  };
  return avg_rating_accessory;
};