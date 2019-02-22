const transactions = require('../models').transaction;
const create_transaction=(client_id,owner_id,vehicle_id,transaction_type,from,to,status)=>{
transactions.create({
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