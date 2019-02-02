const card_details = require('./../models').card_details;

card_details.bulkCreate([{
    card_no: "378282246310005",
    name:"Lionel Dsouza",
    cvv:123,
    expiry_date:"01/22",
    bank_account_no:"021000021",
    mobile_no:9856235486,
    funds:200000

},
    {
        card_no: "6011111111111117",
        name:"Jovin Dsouza",
        cvv:123,
        expiry_date:"01/23",
        bank_account_no:"011401533",
        mobile_no:9856235476,
        funds:200000
    },
    {
        card_no: "5555555555554444",
        name:"Rohan Dsouza",
        cvv:125,
        expiry_date:"02/23",
        bank_account_no:"091000019",
        mobile_no:9856235776,
        funds:200000
    },
    {
        card_no: "4111111111111111",
        name:"Joesph Castellino",
        cvv:135,
        expiry_date:"02/25",
        bank_account_no:"091000010",
        mobile_no:9886235776,
        funds:200000

    }



]).then(result => {
    console.log("Data Inserted")
    process.exit()
}).catch(e => console.log(e))

