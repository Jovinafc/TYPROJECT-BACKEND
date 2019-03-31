'use strict';
module.exports = (sequelize, DataTypes) => {
  const helpful_accessory = sequelize.define('helpful_accessory', {
    feedback_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    accessory_id:DataTypes.BIGINT,
    helpful: DataTypes.STRING,
    not_helpful: DataTypes.STRING
  }, {});
  helpful_accessory.associate = function(models) {
    helpful_accessory.belongsTo(models.accessory_rating,{foreignKey:"id"})
  };
  return helpful_accessory;
};