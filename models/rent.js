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
    rent.belongsTo(models.vehicle_transaction,{foreignKey:"client_id",sourceKey:"client_id"})
  };
  return rent;
};