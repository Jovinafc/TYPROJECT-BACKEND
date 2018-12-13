'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    rating_id:{type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
      user_id: {
        type:DataTypes.BIGINT,
        references:{
            model:"user",
            key:"user_id"
        }
      },
   vehicle_id: {
        type:DataTypes.BIGINT,
       references: {
            model:"vehicle",
           key:"vehicle_id"
       }
   },
    vehicle_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    rating_number: DataTypes.BIGINT
  }, {underscore:true});
  rating.associate = function(models) {

  };
  return rating;
};