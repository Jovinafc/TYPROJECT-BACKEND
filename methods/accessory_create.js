const accessory_create = require('./../models').accessory_transaction

const create_accessory =(user_id,accessory_id,from,to,status)=>{
accessory_create.create({
    user_id:user_id,
    accessory_id:accessory_id,
    from:from,
    to:to,
    status:status

})
}
module.exports={create_accessory}