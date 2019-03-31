'use strict';
module.exports = (sequelize, DataTypes) => {
  const helpful_vehicle = sequelize.define('helpful_vehicle', {
    feedback_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
      vehicle_id:DataTypes.BIGINT,
    helpful: DataTypes.STRING,
    not_helpful: DataTypes.STRING
  }, {});
  helpful_vehicle.associate = function(models) {
    helpful_vehicle.belongsTo(models.feedback,{foreignKey:"feedback_id"})
  };
  return helpful_vehicle;
};