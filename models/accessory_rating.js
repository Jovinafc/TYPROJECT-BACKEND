'use strict';
module.exports = (sequelize, DataTypes) => {
  const accessory_rating = sequelize.define('accessory_rating', {
    id:{
        type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
      user_id: {
        type:DataTypes.BIGINT,
          references: {
            model:"users",
              key:"user_id"
          }
      },
    accessory_id: {
        type:DataTypes.BIGINT,
        references:{
            model:"accessories",
            key:"accessory_id"
        }
    },
    rating: DataTypes.BIGINT,
    review: DataTypes.STRING
  }, {});
  accessory_rating.associate = function(models) {
accessory_rating.belongsTo(models.accessory,{foreignKey:"accessory_id"})
      accessory_rating.belongsTo(models.user,{foreignKey: "user_id"})
 accessory_rating.hasMany(models.helpful_accessory,{foreignKey:"feedback_id"})
 accessory_rating.hasMany(models.avg_rating_accessory,{foreignKey:"accessory_id"})
  };
  return accessory_rating;
};