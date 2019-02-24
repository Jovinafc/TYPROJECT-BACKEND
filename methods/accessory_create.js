const accessory_create = require('./../models').accessory_transaction

const create_accessory =(user_id,accessory_id,quantity,from,to,amount,status)=>{
accessory_create.create({
    user_id:user_id,
    accessory_id:accessory_id,
    quantity:quantity,
    from:from,
    to:to,
    amount:amount,
    status:status

})
}
module.exports={create_accessory}