'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    user_id:{type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true},
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    DOB: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image:DataTypes.STRING,
      address:DataTypes.STRING,
    state:DataTypes.STRING,
    city:DataTypes.STRING,
    pincode:DataTypes.STRING,
    documents:DataTypes.STRING,
    bank_account_no:DataTypes.STRING


  }, {underscore:true});
  user.associate = function(models) {
    user.hasOne(models.feedback,{foreignKey:"user_id"})
    user.hasOne(models.rating,{foreignKey: "user_id"})
    user.hasOne(models.owner,{foreignKey:"user_id"})
    user.hasOne(models.client,{foreignKey:"user_id"})
      user.hasMany(models.accessory_transaction,{foreignKey:'user_id'})
      user.hasMany(models.accessory_rating,{foreignKey:'user_id'})
  };
  return user;
};