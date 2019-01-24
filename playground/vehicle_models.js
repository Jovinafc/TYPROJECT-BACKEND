const twoWheeler = require('../models').twoWheeler;
const fourWheeler = require('../models').fourWheeler;
//const db = require('../models/index.js');

    twoWheeler.bulkCreate([{
        brand: "Aprilia",
        model: "SR 150",
        fuel: "Petrol"
    },
        {
            brand: "Aprilia",
            model: "SR 125",
            fuel: "Petrol"
        }
        ,
        {
            brand: "Bajaj",
            model: "Pulsar RS200",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Dominar 400",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Pulsar NS160",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Pulsar 220F",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Pulsar 180",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Pulsar NS200",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "V15",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Avenger Street 22",
            fuel: "Petrol"
        },
        {
            brand: "Bajaj",
            model: "Avenger Cruise 220",
            fuel: "Petrol"
        },
        {
            brand: "Benelli",
            model: "TNT 600 i",
            fuel: "Petrol"
        },
        {
            brand: "Benelli",
            model: "TNT 300",
            fuel: "Petrol"
        },
        {
            brand: "Benelli",
            model: "TNT 25",
            fuel: "Petrol"
        },
        {
            brand: "Benelli",
            model: "TNT 600 GT",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Karizma ZMR",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Passion XPro",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Duet",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Splender Pro",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Passion Pro",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Glamour",
            fuel: "Petrol"
        },
        {
            brand: "Hero",
            model: "Pleasure",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "Activa-i",
            fuel: "Petrol"
        },

        {
            brand: "Honda ",
            model: "Aviator",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "CB Shine",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "CB Unicorn 150",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "Dio",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "CBR 150R",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "CBR 250R",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "Activa 3G",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "Activa 4G",
            fuel: "Petrol"
        },
        {
            brand: "Honda ",
            model: "Activa 5G",
            fuel: "Petrol"
        },
        {
            brand: "KTM",
            model: "Duke 200",
            fuel: "Petrol"
        },
        {
            brand: "KTM",
            model: "Duke 390",
            fuel: "Petrol"
        },
        {
            brand: "KTM",
            model: "RC 200",
            fuel: "Petrol"
        },
        {
            brand: "KTM",
            model: "RC 390",
            fuel: "Petrol"
        },
        {
            brand: "KTM",
            model: "Duke 250",
            fuel: "Petrol"
        },
    ]).then((result) => {
        fourWheeler.bulkCreate([{
            brand: "Audi",
            model: "A4",
            fuel: "Diesel/Petrol",
        },
            {
                brand: "Audi",
                model: "Q3",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Audi",
                model: "R8",
                fuel: "Petrol",
            },
            {
                brand: "Audi",
                model: "A8",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Audi",
                model: "A3",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Audi",
                model: "Q7",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Audi",
                model: "S5",
                fuel: "Petrol",
            },
            {
                brand: "Audi",
                model: "A6",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Audi",
                model: "Q5",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "X1",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "3 Series GT",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "X5",
                fuel: "Diesel",
            },
            {
                brand: "BMW",
                model: "7 Series",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "3 Series",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "M2",
                fuel: "Petrol",
            },
            {
                brand: "BMW",
                model: "6 Series",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "X3",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "5 Series",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "BMW",
                model: "M Series",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Amaze",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "City",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "WRV",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Jazz",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "BRV",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "CR-V",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Accord",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Brio",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Civic",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Honda",
                model: "Vezel",
                fuel: "Diesel/Petrol",
            },
            {
                brand: "Mercedes-Benz",
                model: "G-Class",
                fuel: "Petrol",
            },
            {
                brand: "Mercedes-Benz",
                model: "S-Class",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "C-Class",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "A-Class",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "GLA Class",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "CLS",
                fuel: "Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "GLC",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Mercedes-Benz",
                model: "GLE",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Dzire",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Swift",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Ertiga",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Baleno",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Vitara Brezza",
                fuel: "Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Alto 800",
                fuel: "Petrol/CNG",
            },
            {
                brand: "Maruti Suzuki",
                model: "Wagon R",
                fuel: "Petrol/CNG",
            },
            {
                brand: "Maruti Suzuki",
                model: "Alto K10",
                fuel: "Petrol/CNG",
            },
            {
                brand: "Maruti Suzuki",
                model: "Ciaz",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Maruti Suzuki",
                model: "Celerio",
                fuel: "Petrol/CNG",
            },
            {
                brand: "Maruti Suzuki",
                model: "Eeco",
                fuel: "Petrol/CNG",
            },
            {
                brand: "Toyota",
                model: "Fortuner",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Toyota",
                model: "Innova Crysta",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Toyota",
                model: "Yaris",
                fuel: "Petrol",
            },
            {
                brand: "Toyota",
                model: "Platinum Etios",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Toyota",
                model: "Etios Liva",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Toyota",
                model: "Corolla Altis",
                fuel: "Petrol/Diesel",
            },
            {
                brand: "Toyota",
                model: "Land Cruiser",
                fuel: "Diesel",
            },
        ]).then(result => {
            console.log("Data Inserted")
            process.exit()
        })


    }).catch(e => console.log(e))


