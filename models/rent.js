'use strict';
module.exports = (sequelize, DataTypes) => {
  const rent = sequelize.define('rent', {
    vehicle_id: DataTypes.BIGINT,
    client_id: DataTypes.BIGINT,
    owner_id: DataTypes.BIGINT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  rent.associate = function(models) {
    // associations can be defined here
  };
  return rent;
};