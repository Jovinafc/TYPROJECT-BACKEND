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
        },primaryKey: true
      },
   vehicle_id: {
        type:DataTypes.BIGINT,
       references: {
            model:"vehicle_transaction",
           key:"vehicle_id"
       },
       primaryKey: true

   },

    vehicle_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    rating_number: DataTypes.BIGINT
  }, {underscore:true});
  rating.associate = function(models) {
        rating.belongsTo(models.vehicle_transaction,{foreignKey:"vehicle_id"})
        rating.belongsTo(models.user,{foreignKey:"user_id"})
      rating.belongsTo(models.vehicle,{foreignKey:"vehicle_id"})

  };
  return rating;
};