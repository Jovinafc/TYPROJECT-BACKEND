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
            model:"vehicle",
            key:"vehicle_id"
        }
    },
    vehicle_name: DataTypes.STRING,
   user_id: {
        type:DataTypes.BIGINT,
       references: {
            model:"user",
           key:"user_id"
       }
   },
    user_name: DataTypes.STRING,
    feedback_comment: DataTypes.STRING
  }, {underscore:true});
  feedback.associate = function(models) {

  };
  return feedback;
};