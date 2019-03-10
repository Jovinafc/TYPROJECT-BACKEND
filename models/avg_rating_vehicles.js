'use strict';
module.exports = (sequelize, DataTypes) => {
  const avg_rating_vehicles = sequelize.define('avg_rating_vehicles', {
    vehicle_id: {
        type:DataTypes.BIGINT,
        primaryKey:true
    },
    avg_rating: DataTypes.FLOAT
  }, {});
  avg_rating_vehicles.associate = function(models) {
    avg_rating_vehicles.belongsTo(models.vehicle,{foreignKey:"vehicle_id"})
  };
  return avg_rating_vehicles;
};