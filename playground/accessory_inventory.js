const accessory = require('./../models').accessory
accessory.bulkCreate([{
    accessory_name: 'Scooter Umbrella',
    accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645220/Inventory/Scooter_Umbrella.jpg',
    accessory_details: 'Universal Umbrella for Scooters Only',
    accessory_type:'Motorcycle Covers',
    accessory_price: 500,
    accessory_use: 'Two-Wheelers',
    accessory_qty:10
},
    {
        accessory_name: 'Leg Guard Rope',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645218/Inventory/Leg_Guard_Rope.jpg',
        accessory_details: 'Rope for Bike Guards',
        accessory_type:'Motorcycle Covers',
        accessory_price: 300,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Universal Waterproof Bike Mount Stand',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645221/Inventory/Universal_Bike_Mount_Stand.webp',
        accessory_details: 'Mobile Holder for Bikes',
        accessory_type:'Motorcycle Accessories',
        accessory_price: 300,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Key Chains',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645220/Inventory/Key_Chains.jpg',
        accessory_details: 'Fancy Key Chains ',
        accessory_type:'Motorcycle Key Chains',
        accessory_price: 100,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Helmet',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645217/Inventory/Helmet.jpg',
        accessory_details: 'Best Quality Helmet for Motorcycle',
        accessory_type:'Motorcycle Helmets',
        accessory_price: 999,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Protectors',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645219/Inventory/Protectors.jpg',
        accessory_details: 'Knee Protectors for Motorcycle',
        accessory_type:'Motorcycle Protectors',
        accessory_price: 700,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Head and Face Covers',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645221/Inventory/Head_And_Face_Covers.jpg',
        accessory_details: 'Head and Face Covers for Motorcycles from dust,wind and sun',
        accessory_type:'Motorcycle Protectors',
        accessory_price: 100,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Biker Jacket',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645217/Inventory/Biker_Jacket.jpg',
        accessory_details: 'Best Quality Bike Jacket',
        accessory_type:'Motorcycle Protectors',
        accessory_price: 1300,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Gloves',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645218/Inventory/Gloves.jpg',
        accessory_details: 'Motorcycle Gloves for long rides',
        accessory_type:'Motorcycle Protectors',
        accessory_price: 300,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Arm Sleeves',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645216/Inventory/Arm_Sleeves.jpg',
        accessory_details: 'Arm sleeves for protection from sun rays',
        accessory_type:'Motorcycle Protectors',
        accessory_price: 200,
        accessory_use: 'Two-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Car Shampoo',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645215/Inventory/Car_Shampoo.jpg',
        accessory_details: 'Best Quality Car Shampoo',
        accessory_type:'Car Parts',
        accessory_price: 300,
        accessory_use: 'Four-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Covers',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645219/Inventory/Covers_and_Mats.jpg',
        accessory_details: 'Best Quality Car Covers',
        accessory_type:'Car Parts',
        accessory_price: 700,
        accessory_use: 'Four-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Air Purifiers',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645221/Inventory/Air_Purifier.jpg',
        accessory_details: 'Best Quality Car Air Purifiers',
        accessory_type:'Car Parts',
        accessory_price: 1200,
        accessory_use: 'Four-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Sun Shades',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645220/Inventory/Sun_Shadesz.jpg',
        accessory_details: 'Best Quality Car Sun Shades',
        accessory_type:'Car Parts',
        accessory_price: 900,
        accessory_use: 'Four-Wheelers',
        accessory_qty:10
    },
    {
        accessory_name: 'Mobile Accessory',
        accessory_image: 'https://res.cloudinary.com/beast0013/image/upload/v1549645220/Inventory/Mobile_Phone_Holder.jpg',
        accessory_details: 'Best Quality Car Mobile Holder',
        accessory_type:'Car Parts',
        accessory_price: 100,
        accessory_use: 'Four-Wheelers',
        accessory_qty:10
    },



]).then(res=>{
    console.log('Data Inserted in Accessory Table')
    process.exit();
}).catch(error=>{
    console.log(error)
    process.exit();
})

