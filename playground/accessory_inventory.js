const accessory = require('./../models').accessory
accessory.bulkCreate([{
    accessory_name: '',
    accessory_image: '',
    accessory_details: '',
    accessory_type:'',
    accessory_price: 0,
    accessory_use: '',
    accessory_qty:10
}]).then(res=>{
    console.log('Data Inserted in Accessory Table')
    process.exit();
}).catch(error=>{
    console.log(error)
    process.exit();
})

