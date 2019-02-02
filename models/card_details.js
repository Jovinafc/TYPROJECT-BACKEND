'use strict';
module.exports = (sequelize, DataTypes) => {
  const card_details = sequelize.define('card_details', {
    card_no: DataTypes.STRING,
    name: DataTypes.STRING,
    cvv: DataTypes.INTEGER,
    expiry_date: DataTypes.STRING,
    bank_account_no: DataTypes.STRING,
    mobile_no: DataTypes.DOUBLE,
    funds: DataTypes.DOUBLE
  }, {});
  card_details.associate = function(models) {
    // associations can be defined here
  };
  return card_details;
};