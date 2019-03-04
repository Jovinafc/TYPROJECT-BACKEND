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
  };
  return accessory_rating;
};