//--- packages --
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app =express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer');
const cloudinary = require('cloudinary')
var fs = require('fs');
const Sequelize = require('sequelize');

//----models-----
const twoWheeler = require('./models').twoWheeler
const fourWheeler = require('./models').fourWheeler
const vehicle = require('./models').vehicle;
const user = require('./models').user;
const inventory = require('./models').inventory;
const transaction =require('./models').transaction;
const rent = require('./models').rent;

//------ For parsing json data and allowing cross-communication between react and node
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());



//-----------image storing------

//-----------Cloudinary
cloudinary.config({
    cloud_name: 'beast0013',
    api_key: '317643389281754',
    api_secret: '0UQHQHXe4QU_aqg6gtbOxuPUO0g'
});



//file - upload
let imagefilename='';
let profileimagename='';
let documentimagename='';
let clientimagename='';
let imageURL='';
let profileImage='';
let documentURL='';
let clientURL='';
let ownerdocumentname='';
let ownerURL=''




app.post('/image', async function (req, res) {
    filename=''
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            imagefilename=file.fieldname + '-' + Date.now()+'.jpg';
            cb(null, imagefilename)

        }
    })

    var upload = multer({ storage: storage }).single('image');
    imageURL=''

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
            } else if (err) {
                // An unknown error occurred when uploading.
            }
            cloudinary.v2.uploader.upload(`uploads/${imagefilename}`,
                function(error, result) {
                console.log(imagefilename)
                    imageURL=result.url

                    fs.exists(`uploads/${imagefilename}`, function (exists) {
                        if (exists) {

                            console.log('File exists. Deleting now ...');
                            fs.unlink(`uploads/${imagefilename}`);
                        } else {

                            console.log('File not found, so not deleting.');
                        }
                    });

                    res.send('Image Stored')
                    console.log('Image Stored',imageURL)
                });


        })



})

app.post('/profileImage',(req,res)=>{
    profileImage=''

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            profileimagename=file.fieldname + '-' + Date.now()+'.jpg';
            cb(null, profileimagename)

        }
    })


    var uploadProfileImage = multer({ storage: storage }).single('profileImage');
    uploadProfileImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        cloudinary.v2.uploader.upload(`uploads/${profileimagename}`,
            function (error, result) {
                console.log(profileimagename)
                profileImage = result.url


                const deleteImage= fs.exists(`uploads/${profileimagename}`, function (exists) {
                    if (exists) {

                        console.log('File exists. Deleting now ...');
                        fs.unlink(`uploads/${profileimagename}`);
                    } else {

                        console.log('File not found, so not deleting.');
                    }
                });
                res.send('Profile Image Stored')
                console.log('profile Image Stored',profileImage)




});


    })

})


//---- Owner Document---
app.post('/OwnerImage',(req,res)=>{
    ownerURL=''

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            ownerdocumentname=file.fieldname + '-' + Date.now()+'.jpg';
            cb(null, ownerdocumentname)

        }
    })


    var uploadDocumentImage = multer({ storage: storage }).single('ownerImage');
    uploadDocumentImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        cloudinary.v2.uploader.upload(`uploads/${ownerdocumentname}`,
            function (error, result) {

                ownerURL = result.url

                console.log('Document Image Stored',ownerURL)

                const deleteImage=
                    fs.exists(`uploads/${ownerdocumentname}`, function (exists) {
                        if (exists) {

                            console.log('File exists. Deleting now ...');
                            fs.unlink(`uploads/${ownerdocumentname}`);
                        } else {

                            console.log('File not found, so not deleting.');
                        }
                    });
                res.send('Document Image Stored')

            });



    })

})


// ---- Insert vehicle document----
app.post('/documentImage',(req,res)=>{
    documentURL=''

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            documentimagename=file.fieldname + '-' + Date.now()+'.jpg';
            cb(null, documentimagename)

        }
    })


    var uploadDocumentImage = multer({ storage: storage }).single('documentImage');
    uploadDocumentImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        cloudinary.v2.uploader.upload(`uploads/${documentimagename}`,
            function (error, result) {

                documentURL = result.url

                console.log('Document Image Stored',documentURL)

                const deleteImage=
                    fs.exists(`uploads/${documentimagename}`, function (exists) {
                        if (exists) {

                            console.log('File exists. Deleting now ...');
                            fs.unlink(`uploads/${documentimagename}`);
                        } else {

                            console.log('File not found, so not deleting.');
                        }
                    });
                res.send('Document Image Stored')

            });



    })

})

//----- client document
app.post('/clientImage',(req,res)=>{
    clientURL=''

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            clientimagename=file.fieldname + '-' + Date.now()+'.jpg';
            cb(null, clientimagename)

        }
    })


    var uploadDocumentImage = multer({ storage: storage }).single('clientImage');
    uploadDocumentImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        cloudinary.v2.uploader.upload(`uploads/${documentimagename}`,
            function (error, result) {

                clientURL = result.url

                console.log('Document Image Stored',clientURL)

                const deleteImage=
                    fs.exists(`uploads/${clientimagename}`, function (exists) {
                        if (exists) {

                            console.log('File exists. Deleting now ...');
                            fs.unlink(`uploads/${clientimagename}`);
                        } else {

                            console.log('File not found, so not deleting.');
                        }
                    });
                res.send('Document Image Stored')

            });



    })

})



//-----Sign Up Route -------------
app.post('/sign-up',async (req,res)=>{

        let hashedPassword='';
        var users = req.body.users;

        const saltRounds = 10;

        //------------------------ hashing password ---------------
     const passwordCreation=await bcrypt.hash(users.password, saltRounds).then((result) => {
             hashedPassword = result;

        })

        //--------------Storing data in Database ------------------
    const dataStoring = await user.create({
        first_name:users.first_name,
        last_name:users.last_name,
        phone_number:users.phone_number,
        DOB:users.DOB,
        email:users.email,
        password:hashedPassword

    }).then(result=>{
        res.send('Data Saved in User Table')
    }).catch(e=>
    {
        res.status(403).send(e)
    console.log(e)
    })

    



})

//---------- Sign in Route-------------
app.post('/sign-in',async (req,res)=>{

        console.log(req.body.users);
        let fetchedEmail = req.body.users.email;
        let fetchedPassword = req.body.users.password;
        let storedPassword='';
        let generateToken='';
        let expiresIn='';


        var jwtDetails={
            user_id:req.body.users.user_id,
            email:req.body.users.email
        };
        //--------- generating token using email and user_id -------------------------
        const jwtCreation=await jwt.sign(jwtDetails,'secretkey',{
        expiresIn: '1h'
    },(err,token)=>{
        if(err)
        {
            console.log(err)
        }
        generateToken=token;
    });

        const decodedToken= jwt.verify(generateToken,'secretkey',function(err,token){
            expiresIn = token.exp;
        }
    )


        const data=await user.findOne({attributes:['user_id','first_name','last_name','email','password'],where:{email:fetchedEmail}}).then((User)=>{
            if(!User)
            {
                res.status(403).send('User Does Not Exist')

            }
            else
            {
               
                storedPassword=User.password;
                const match= bcrypt.compareSync(fetchedPassword,storedPassword)
                if(match)
                {


                    res.json({user_id:User.user_id,name:User.first_name+' '+User.last_name,expiresIn:expiresIn,token:generateToken})


                }
                else
                {
                    res.status(403).send('Invalid Password')
                }
            }

        }).catch(e=>res.send(e))


})
//-----------------Inventory Routes--------
//--- fetch inventory details
app.get('/inventoryProducts',(req,res)=> {
    let products = [];

    inventory.findAll({attributes: ['id', 'name', 'Quantity', 'Price']}).then((product) => {
        for (var i = 0; i < product.length; i++) {
            products.push(
                {
                    "id": product[i].dataValues.id,
                    "name": product[i].dataValues.name,
                    "Quantity": product[i].dataValues.Quantity,
                    "Price": product[i].dataValues.Price
                })

        }

        res.status(200).send(products)
    }).catch(e=>res.status(400).send(e))

})

//---Update the status of a product
app.post('/updateProduct',async (req,res)=>{
    const id = req.body.product.product_id;
    let qty;
    const findProduct=await inventory.findOne({attributes:['Quantity'],where:{id:id}}).then((currentQty)=> {
    qty = currentQty.dataValues.Quantity;
    return qty;
}).catch(e=>res.status(404).send(e));

    if(findProduct !==0)
    {
        if(req.body.updateType ==="add"){
        const updateProduct =await inventory.update({
            Quantity:findProduct+1
        },{where:{
                id:id
            }}).then(()=>{
            res.send({
                success:true,
                Quantity:findProduct+1
            })
        }).catch(e=>res.status(404).send(e))
}
        else if(req.body.updateType === 'delete')
        {

            const updateProduct =await inventory.update({
                Quantity:findProduct-1
            },{where:{
                    id:id
                }}).then(()=>{
                res.send({
                    success:true,
                    Quantity:findProduct-1
                })
            }).catch(e=>res.status(404).send(e))
        }
    }
    else
    {
        res.send('Product Out od Stock');
    }


});






//-----------------






//------------------------ Main Routes   --------------------------
//-----------Fetch vehicle type---------
app.get('/fetch-vehicle-type',(req,res)=>{
    var vehicle_type=["Two-Wheelers","Four-Wheelers"];
    res.status(200).send(vehicle_type)
})


//---- Fetch TwoWheeler fuel -----------
app.get('/fetch-twoWheeler-fuel',(req,res)=>{
var fuel = ["Petrol"]
    res.send(fuel)
})


//---- Fetch FourWheeler fuel -----------
app.get('/fetch-fourWheeler-fuel',(req,res)=>{
    var fuel = ["Petrol","CNG","Diesel"]
    res.send(fuel)

})


//---- Fetch Year -----------
app.get('/fetch-year',(req,res)=>{
    var year = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
    res.send(year)
})

//---- Fetch registration-state -----------
app.get('/fetch-registration-state',(req,res)=>{
    var registration_state=["Andhra Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Karnataka","Maharashtra"]
    res.send(registration_state)
})

//-----Fetch km-driven----------
app.get('/fetch-km_driven',(req,res)=>{
    var km_driven=["0-10000","10000-20000","20000-30000","30000-40000","40000-50000","50000-60000","70000-80000","80000-900000","90000-100000"]
    res.send(km_driven)
})

//--------------- Fetch Two wheeler brand------------
app.get('/fetch-twoWheeler-brand',(req,res)=>{
    var brand=["Aprilia","Bajaj","Benelli","Hero","Honda ","KTM","Others"]
    res.status(200).send(brand)
})

//--------------- Fetch Four wheeler brand------------
app.get('/fetch-fourWheeler-brand',(req,res)=>{
    var brand =["Audi","BMW","Honda","Mercedes-Benz","Maruti Suzuki","Toyota","Others"]
    res.status(200).send(brand)
})

//--------------- Fetch Two wheeler model------------
app.post('/fetch-twoWheeler-model',(req,res)=>{
   var model =[];
   twoWheeler.findAll({attributes:['model'],where:{brand:`${req.body.brand}`}}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            model.push(result[i].model)
        }
       res.send(model)
   }).catch(e=>res.status(400).send(e))
})

//--------------- Fetch Four wheeler brand------------
app.post('/fetch-fourWheeler-model',(req,res)=>{
    var model =[];
    fourWheeler.findAll({attributes:['model'],where:{brand:`${req.body.brand}`}}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            model.push(result[i].model)
        }
        res.send(model)
    }).catch(e=>res.status(400).send(e))
})

////--------------- Store vehicle details of sell/lend into vehicle table------------
app.post('/store-vehicle-details', (req,res)=>{
        var vehicles = req.body.vehicles
    console.log(imageURL)

   const vehicleStorage=()=> {
       vehicle.create({
           vehicle_type: vehicles.type,
           user_id:vehicles.user_id,
           brand: vehicles.brand,
           model: vehicles.model,
           fuel_type: vehicles.fuel,
           year: vehicles.year,
           registration_state: vehicles.registration_state,
           km_driven: vehicles.km_driven,
           number_plate: vehicles.number_plate,
           price: vehicles.price,
           price_per_day:vehicles.price_per_day,
           image: imageURL,
           documents: vehicle.documents,
           status:'AVAILABLEg'
       }).then((result) => {
           console.log('Data Inserted');
          user.findOne({where:{user_id:result.dataValues.user_id}}).then((result1)=>{
              owner.create({
                    vehicle_id:result.dataValues.vehicle_id,
                    user_id:vehicles_user_id,
                    name: result1.dataValues.first_name+' '+result1.dataValues.last_name,
                    address:result1.dataValues.address,
                    pincode:vehicles.pincode,
                  mobile_no:result1.dataValues.phone_number,
                  email:result1.dataValues.email,
                  DOB:result1.dataValues.DOB,
                  documents:ownerURL

              })
          })





           res.send('Data Inserted')

       }).catch(e => console.log(e))
   }
   setTimeout(vehicleStorage,5000)

})


//------ Buying Logic ----
app.post('/buy-now',(req,res)=> {
    let vehicles = req.body.vehicles
    user.findOne({where:{user_id:vehicles.client_id}}).then((result)=>{
        client.create({
            vehicle_id:vehicles.vehicle_id,
            user_id:vehicles.client_id,
            name: result.dataValues.first_name+' '+result.dataValues.last_name,
            address:result.dataValues.address,
            city:vehicles.city,
            pincode:vehicles.pincode,
            mobile_no: result.dataValues.phone_number,
            email:result.dataValues.email,
            DOB:result.dataValues.DOB,
            documents:clientURL
        }).then((clientResult)=>{
            transaction.create({
                client_id:clientResult.dataValues.client_id,
                vehicle_id:vehicles.vehicle_id,
                date:vehicles.date,
                type:vehicles.type
            }).then((transactionResult)=>{
                vehicle.update({status:'SOLD',where:{vehicle_id:vehicles.vehicle_id}}).then(()=>{
                    res.send('Vehicle Sold')
                })
            })
        })
    })

})
//---------- Renting Logic
pp.post('/rent-now',async (req,res)=>{
    let vehicle_id= req.body.vehicle_id;
    let start = req.body.start_date
    let end= req.body.end_date
    let user_details=[]
    let owner_details=[];
    let client_details=[];
    let user_id=null;
    let user_client_id = req.body.user_client_id;

    const vehicle1=await vehicle.findOne({where: {vehicle_id: vehicle_id}}).then((result) => {
        user_id = result.dataValues.user_id;
        console.log(user_id)
    });
    const vehicle2=  await  owner.findOne({where: {user_id: user_id}}).then((result1) => {
        owner_details.push(result1.dataValues)

    });
    const vehicle3=await  user.findOne({where: {user_id: user_client_id}}).then((result2) => {
        user_details.push(result2.dataValues)
        let test = [];
        test.push(owner_details)
        test.push(user_details)
        // res.send(test)

    })

    const vehicle4= await client.create({
        vehicle_id:owner_details[0].vehicle_id,
        user_id:user_client_id,
        name:user_details[0].first_name,
        address:user_details[0].address,
        city:req.body.details.city,
        pincode:req.body.details.pincode,
        mobile_no:user_details[0].phone_number,
        email:user_details[0].email,
        DOB:user_details[0].DOB,
        documents:clientURL

    }).then((result3)=>{
        client_details.push(result3.dataValues)
    })
    const vehicle5 = await rent.create({
        vehicle_id:owner_details[0].vehicle_id,
        client_id:client_details[0].client_id,
        owner_id:owner_details[0].owner_id,
        start_date:start,
        end_date:end
    }).then((result4)=>{
        vehicle.update({status:'RENTED'},{where:{vehicle_id:owner_details[0].vehicle_id}}).then(()=>{
            res.send('Vehicle Rented')
        })
    })





})




//----------Fetch twoWheeler details stored in database for displaying--------
app.get('/fetch-twoWheeler-details',(req,res)=>{
   var vehicle_details=[]
    vehicle.findAll({attributes:['vehicle_id','vehicle_type','brand','model','fuel_type','year','registration_state','km_driven','number_plate','price_per_day','image','documents','price','status'],where:{vehicle_type:'Two-Wheelers'}}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            vehicle_details.push(result[i])
        }

        res.send(vehicle_details)
    })
})


//----------Fetch fourWheeler details stored in database for displaying--------
app.get('/fetch-fourWheeler-details',(req,res)=>{
    var vehicle_details=[]
    vehicle.findAll({attributes:['vehicle_id','vehicle_type','brand','model','fuel_type','year','registration_state','km_driven','number_plate','price_per_day','image','documents','price','status'],where:{vehicle_type:'Four-Wheelers'}}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            vehicle_details.push(result[i])
        }

        res.send(vehicle_details)
    })
})

//----------Fetch all Vehicle details stored in database for displaying--------
app.get('/fetch-allVehicles-details',(req,res)=>{
    var vehicle_details=[]
    vehicle.findAll({attributes:['vehicle_id','user_id','vehicle_type','brand','model','fuel_type','year','registration_state','km_driven','number_plate','price_per_day','image','documents','price','status']}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            vehicle_details.push(result[i])
        }

        res.send(vehicle_details)
    })
})



//------------- update profile image------
app.post('/update-profile-image',async (req,res)=>{
    console.log(profileImage)
 const profileImage1= await user.update({image:profileImage},{where:{user_id:req.body.user_id}}).then((result)=>{


     const deleteImage=()=> {

     }
        deleteImage();
     res.send('Profile Image Updated')
    }).catch(e=>res.send(e))





})
// ----- Fetch Specific Vehicle Details ----

app.post('/fetch-specific-vehicle/:id',(req,res)=>{
    let vehicle_id= req.params.id;
    vehicle.findOne({where:{vehicle_id:vehicle_id}}).then((result)=>{
        res.send(result.dataValues)
    }).catch(error=>res.status(400).send(error))

})


//------ Fetch Specific User Details ---
app.post('/fetch-user',(req,res)=>{
    let user_id = req.body.user_id;
    user.findOne({where:{user_id:user_id}}).then((result)=>{
        res.send(result.dataValues)
    }).catch(error=>res.status(400).send(error))
})

// ------------- change user password
app.post('/update-password',async (req,res)=> {
    //check password
    let fetchedEmail = req.body.email;
    let fetchedPassword = req.body.old_password;
    let storedPassword = '';
    const data = await user.findOne({
        attributes: ['email', 'password'],
        where: {email: fetchedEmail}
    }).then((User) => {
        if (!User) {
            res.status(403).send('User Does Not Exist')

        }
        else {

            storedPassword = User.password;
            const match = bcrypt.compareSync(fetchedPassword, storedPassword)
            if (match) {

                let hashedPassword = '';
                var users = req.body;

                const saltRounds = 10;

                //------------------------ hashing password ---------------
                const passwordCreation = bcrypt.hash(users.password, saltRounds).then((result) => {
                    hashedPassword = result;
                    user.update({password:hashedPassword},{where:{email:fetchedEmail}}).then(result=>{
                        res.send('Password Updated')
                    })

                })

            }
            else {
                res.status(403).send('Invalid Password')
            }
        }


    })
})

//-------- Delete User Account
app.post('/delete-account',async (req,res)=>{
    let fetchedEmail = req.body.email;
    let fetchedPassword = req.body.password;
    let storedPassword = '';
    const data = await user.findOne({
        attributes: ['email', 'password'],
        where: {email: fetchedEmail}
    }).then((User) => {
        if (!User) {
            res.status(403).send('User Does Not Exist')

        }
        else {

            storedPassword = User.password;
            const match = bcrypt.compareSync(fetchedPassword, storedPassword)
            if (match) {

                user.update({email:'',password:''},{where:{user_id:req.body.user_id}}).then(result=>{
                    res.send('Account deleted')
                }).catch(error=>res.status(440).send(error))


            }
            else {
                res.status(403).send('Invalid Password')
            }
        }

    })


})


//-------- filtering data based on checkbox ---------
app.post('/filtered-vehicle-results',async (req,res)=>{

    let filteredResult =[]
    let condition = req.body


    for (let filterType in condition) {
        let filter = req.body[filterType].filterOption
        let value = req.body[filterType].filterValue

        console.log(filter + ' ' + value)



        if (filter === 'vehicle_type') {
            const filteringResults = await vehicle.findAll({where: {vehicle_type: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))


        }

        else if (filter === 'brand') {
            const filteringResults = await vehicle.findAll({where: {brand: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }

        else if (filter === 'model') {
            const filteringResults = await vehicle.findAll({where: {model: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }
        else if (filter === 'fuel_type') {
            const filteringResults = await vehicle.findAll({where: {fuel_type: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }
        else if (filter === 'year') {
            const filteringResults = await vehicle.findAll({where: {year: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }
        else if (filter === 'registration_state') {
            const filteringResults = await vehicle.findAll({where: {registration_state: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }
        else if (filter === 'km_driven') {
            const filteringResults = await vehicle.findAll({where: {km_driven: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }
        else if (filter === 'price_per_day') {
            const filteringResults = await vehicle.findAll({where: {price_per_day: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))

        }


        else if (filter === 'price') {
            const filteringResults = await vehicle.findAll({where: {price: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
        }


    }

    res.send(filteredResult)
    console.log(filteredResult)

})



//--------
//------ Update User Profile
app.post('/update-user-profile',(req,res)=>{
let users = req.body.users;
user.update({first_name:users.first_name,last_name:users.last_name,phone_number:users.phone_number,DOB:users.DOB,address:users.address},{where:
        {user_id:users.user_id}}).then((result)=>{
            res.send('User profile Updated')
}).catch(e=>res.send(e))

})

//--- fetch vehicle of specific users ---
app.post('/fetch-specific-user-vehicles',(req,res)=>{
    let users = req.body;
    let vehicle_details=[];
    vehicle.findAll({where:{user_id:users.user_id}}).then((result)=>{
        for(let vehicle in result)
        {
            vehicle_details.push(result[vehicle].dataValues)
        }
        res.send(vehicle_details)
        }
    )
})

//----- fetch all users vehicle except current
app.post('/fetch-vehicles-except-current-user',(req,res)=>{
    const Op = Sequelize.Op
    const user_id = req.body.user_id
    let collection =[]
    vehicle.findAll({where:{user_id:{[Op.ne]:user_id}}}).then((result)=>{

        for (let i in result)
        {
            collection.push(result[i].dataValues)
        }

        res.send(collection)
    })

})

//--------------
app.listen(3001,()=>{
    console.log('Listening on port 3001')
})


