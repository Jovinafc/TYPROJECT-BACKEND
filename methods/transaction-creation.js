const vehicle_transaction = require('../models').vehicle_transaction;
const create_transaction=(client_id,owner_id,vehicle_id,transaction_type,from,to,status)=>{
vehicle_transaction.create({
client_id:client_id,
    owner_id:owner_id,
    vehicle_id:vehicle_id,
    transaction_type:transaction_type,
    from:from,
    to:to,
    status:status
})
}
module.exports={create_transaction};