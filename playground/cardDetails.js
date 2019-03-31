const card_details = require('./../models').card_details;

card_details.bulkCreate([{
    card_no: "3782 8224 6310 005",
    name:"LIONEL DSOUZA",
    cvv:123,
    expiry_date:"01/22",
    bank_account_no:"021000021",
    mobile_no:9856235486,
    funds:200000

},
    {
        card_no: "6011 1111 1111 1117",
        name:"JOVIN DSOUZA",
        cvv:123,
        expiry_date:"01/23",
        bank_account_no:"011401533",
        mobile_no:9856235476,
        funds:200000
    },
    {
        card_no: "5555 5555 5555 4444",
        name:"ROHAN DSOUZA",
        cvv:125,
        expiry_date:"02/23",
        bank_account_no:"091000019",
        mobile_no:9856235776,
        funds:200000
    },
    {
        card_no: "4111 1111 1111 1111",
        name:"JOESPH CASTELLINO",
        cvv:135,
        expiry_date:"02/25",
        bank_account_no:"091000010",
        mobile_no:9886235776,
        funds:200000

    },
    {
        name:"Bank",
        bank_account_no:"001000000",
        mobile_no:9886235776,
        funds:200000
    },
    {
        name:"Developer",
        bank_account_no:"001000001",
        mobile_no:9856234585,
        funds:200000
    }



]).then(result => {
    console.log("Data Inserted")
    process.exit()
}).catch(e => console.log(e))

