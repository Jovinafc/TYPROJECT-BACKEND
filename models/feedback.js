'use strict';
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    feedback_id:{type:DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    vehicle_id: {
        type:DataTypes.BIGINT,
        references:{
            model:"vehicle_transaction",
            key:"vehicle_id"
        },
        primaryKey: true
    },
    vehicle_name: DataTypes.STRING,
   user_id: {
        type:DataTypes.BIGINT,
       references: {
            model:"user",
           key:"user_id"
       },
       primaryKey: true
   },
    user_name: DataTypes.STRING,
    feedback_comment: DataTypes.STRING
  }, {underscore:true});
  feedback.associate = function(models) {
    feedback.belongsTo(models.vehicle_transaction,{foreignKey:'vehicle_id'})
    feedback.belongsTo(models.user,{foreignKey:'user_id'})
      feedback.belongsTo(models.vehicle,{foreignKey:'vehicle_id'})
    feedback.hasMany(models.helpful_accessory,{foreignKey:"feedback_id"})
    feedback.hasMany(models.helpful_vehicle,{foreignKey:"feedback_id"})
  };
  return feedback;
};