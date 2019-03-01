'use strict';
module.exports = (sequelize, DataTypes) => {
  const vehicle_transaction = sequelize.define('vehicle_transaction', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
    client_id: DataTypes.BIGINT,
    owner_id: {
         type: DataTypes.BIGINT,
        references:{
            model:"owners",
            key:"owner_id"

        }
    },
    vehicle_id:{
      type:DataTypes.BIGINT,
      references: {
          model:"ratings",
          key:"vehicle_id"
      }
    } ,
    user_id:DataTypes.BIGINT,
    transaction_type: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
      amount:DataTypes.DOUBLE,
    status: DataTypes.STRING
  }, {});
  vehicle_transaction.associate = function(models) {
      vehicle_transaction.belongsTo(models.owner,{foreignKey:"owner_id"})
      vehicle_transaction.belongsTo(models.vehicle,{foreignKey: "vehicle_id"})
  };
  return vehicle_transaction;
};