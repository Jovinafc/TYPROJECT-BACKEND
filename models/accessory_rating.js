'use strict';
module.exports = (sequelize, DataTypes) => {
  const accessory_rating = sequelize.define('accessory_rating', {
    id:{
        type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
      user_id: DataTypes.BIGINT,
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
  };
  return accessory_rating;
};