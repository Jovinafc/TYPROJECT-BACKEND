'use strict';
module.exports = (sequelize, DataTypes) => {
  const year_details = sequelize.define('year_details', {
    id:{type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true},
      year: DataTypes.STRING
  }, {});
  year_details.associate = function(models) {
    // associations can be defined here
  };
  return year_details;
};