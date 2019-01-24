'use strict';
module.exports = (sequelize, DataTypes) => {
  const km_driven_details = sequelize.define('km_driven_details', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT
      },
      km_driven: DataTypes.STRING
  }, {});
  km_driven_details.associate = function(models) {
    // associations can be defined here
  };
  return km_driven_details;
};