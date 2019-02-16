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
const schedule = require('node-schedule');
const speakeasy = require('speakeasy');
const nodemailer = require("nodemailer");


//----models-----
const twoWheeler = require('./models').twoWheeler
const fourWheeler = require('./models').fourWheeler
const vehicle = require('./models').vehicle;
const user = require('./models').user;
const inventory = require('./models').inventory;
const transaction =require('./models').transaction;
const rent = require('./models').rent;
const owner = require('./models').owner;
const client = require('./models').client;
const card_details = require('./models').card_details
const accessory = require('./models').accessory
const cart_storage = require('./models').cart_storage
//----middleware
const {authenticate} = require('./middleware/authenticate');

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
            console.log()
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
                res.status(401).send('User Does Not Exist')

            }
            else
            {
               
                storedPassword=User.password;
                const match= bcrypt.compareSync(fetchedPassword,storedPassword)
                if(match)
                {


                    res.json({user_id:User.user_id,name:User.first_name+' '+User.last_name,expiresIn:3600,token:generateToken})


                }
                else
                {
                    res.status(401).send('Invalid Password')
                }
            }

        }).catch(e=>res.send(e))


})
//---- token creation for expiry date
app.get('/getToken/:user_id/:email',(req,res)=>{
    var jwtDetails={
        user_id:req.params.user_id,
        email:req.params.email
    };
    const jwtCreation= jwt.sign(jwtDetails,'secretkey',{
        expiresIn: '1h'
    },(err,token)=>{
        if(err)
        {
            console.log()
        }
        res.send({token:token,expiresIn:3600})
    });

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
app.get('/fetch-twoWheeler-brand',authenticate,(req,res)=>{
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
    console.log(imageURL);
try {
    const vehicleStorage = () => {
        vehicle.create({
            vehicle_type: vehicles.type,
            user_id: vehicles.user_id,
            brand: vehicles.brand,
            model: vehicles.model,
            fuel_type: vehicles.fuel,
            year: vehicles.year,
            registration_state: vehicles.registration_state,
            km_driven: vehicles.km_driven,
            number_plate: vehicles.number_plate,
            price: vehicles.price,
            price_per_day: vehicles.price_per_day,
            image: imageURL,
            documents: vehicle.documents,
            status: 'AVAILABLE'
        }).then((result) => {
            console.log('Data Inserted');
            console.log(result.dataValues)
            user.findOne({where: {user_id: result.dataValues.user_id}}).then((result1) => {
                owner.create({
                    vehicle_id: result.dataValues.vehicle_id,
                    user_id: vehicles.user_id,
                    name: result1.dataValues.first_name + ' ' + result1.dataValues.last_name,
                    address: result1.dataValues.address,
                    pincode: vehicles.pincode,
                    mobile_no: result1.dataValues.phone_number,
                    email: result1.dataValues.email,
                    DOB: result1.dataValues.DOB,
                    documents: ownerURL

                })
            })


            res.send('Data Inserted')

        }).catch(e => console.log(e))
    }
    setTimeout(vehicleStorage, 5000)
}
catch(error){
    res.status(403).send("Error during vehicle storage");
}
})


//------ Buying Logic ----
app.post('/buy-now',(req,res)=> {
    let vehicles = req.body.vehicles
    let amount = req.body.amount;
    let client_account_no = vehicles.client_bank_account;
    let owner_account_no = vehicles.owner_bankaccount;
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
                vehicle.update({status:'SOLD'},{where:{vehicle_id:vehicles.vehicle_id}}).then(()=>{
                   card_details.findOne({where:{name:"Bank"}}).then((details4)=>{
                       card_details.update({funds:details4.dataValues.funds - amount}).then(()=>{


                    card_details.findOne({where:{bank_account_no:owner_account_no}}).then((owner_details)=>{
                             card_details.update({funds:amount+owner_details.dataValues.funds})
                         })
                       })
                   })
                     }).catch((e)=>res.status(403).send(e))
                 }).catch((e)=>res.status(403).send(e))


                    res.send('Vehicle Sold')

                })
            })



})
//---------- Renting Logic
app.post('/rent-now',async (req,res)=>{

    let vehicle_id= req.body.vehicle_id;
    let start = req.body.start_date
    let end= req.body.end_date
    let user_details=[]
    let owner_details=[];
    let client_details=[];
    let user_id=null;
    let user_client_id = req.body.user_client_id;
    let owner_bank_account= req.body.owner_bank_account;
    let client_bank_account= req.body.client_bank_account
    let amount = req.body.amount;
    let deposit = req.body.deposit;
    let totalAmount = amount+deposit;

    const vehicle1=await vehicle.findOne({where: {vehicle_id: vehicle_id}}).then((result) => {
        user_id = result.dataValues.user_id;
        console.log(user_id)
    });
    const vehicle2=  await  owner.findOne({where: {user_id: user_id}}).then((result1) => {
        owner_details.push(result1.dataValues)

    });
    const vehicle3=await  user.findOne({where: {user_id: user_client_id}}).then((result2) => {
        user_details.push(result2.dataValues)


    })

    const vehicle4= await client.create({
        vehicle_id:owner_details[0].vehicle_id,
        user_id:user_client_id,
        name:user_details[0].first_name,
        address:user_details[0].address,
        //city:req.body.details.city,
       // pincode:req.body.details.pincode,
        mobile_no:user_details[0].phone_number,
        email:user_details[0].email,
        DOB:user_details[0].DOB,
        //documents:clientURL

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
            let date= new Date(end);
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            var date1 = new Date(year, month, day, hours, minutes, 0);
            res.send('Vehicle Rented');
            var j = schedule.scheduleJob(user_client_id,date1, function(){
                let owner_funds=null;
                let client_funds=null;
                vehicle.update({status:'AVAILABLE'},{where:{vehicle_id:owner_details[0].vehicle_id}}).then(()=>{
                  card_details.findOne({where:{bank_account_no: client_bank_account}}).then((details)=>{
                      client_funds= details.dataValues.funds;
                  card_details.findOne({where:{bank_account_no:owner_bank_account}}).then((details1)=>{
                      owner_funds= details1.dataValues.funds;
                  card_details.findOne({where:{name:"Developer"}}).then((developer_details)=>{
                      card_details.findOne({where:{name:"Bank"}}).then((bank_details)=>{
                          //deducting funds from bank
                          card_details.update({funds:bank_details.dataValues.funds - totalAmount}).then(()=>{
                              //clients deposit being return
                              card_details.update({funds:details.dataValues.funds + deposit}).then(()=>{
                                  //owner being given his share
                                  card_details.update({funds:details1.dataValues.funds + amount -100}).then(()=>{
                                    // developer being given his share
                                      card_details.update({funds:developer_details.dataValues.funds + 100}).then(()=>{
                                          console.log("Payment Settled");
                                      })
                                  })
                              })

                          })


                      })

                  })

                  })
                  })



        })
            });
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
    const Op = Sequelize.Op;
    let vehicle_id= req.params.id;
    let user_id=req.body.user_id;
    let sendDetails =[]
    let user_details={};

    vehicle.findOne({where:{vehicle_id:vehicle_id,user_id:{[Op.ne]:user_id}}}).then((result)=>{

        sendDetails.push(result.dataValues);
        user.findOne({where:{user_id:result.dataValues.user_id}}).then((result1)=>{
            user_details={
                bank_account_no:result1.dataValues.bank_account_no
            }
            sendDetails.push(user_details)
            res.send(sendDetails)

        })


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
    console.log(condition)


    for (let filterType in condition) {
        let filter = req.body.filterOption
        let value = req.body.filterValue

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
    //console.log(filteredResult)

})



//--------
//------ Update User Profile
app.post('/update-user-profile',async (req,res)=>{
let users = req.body.users;
const update1 =await user.update({first_name:users.first_name,last_name:users.last_name,phone_number:users.phone_number,DOB:users.DOB,address:users.address,
    state:users.state,city:users.city,pincode:users.pincode,documents:clientURL,bank_account_no:users.bank_account_no
},{where:
        {user_id:users.user_id}}).then((result)=>{
            res.send('User profile Updated')
}).catch(e=>res.send(e))

// if(users.bank_account_no!==undefined) {
//     const update2 = await card_details.create({
//         name: users.first_name + "" + users.last_name,
//         bank_account_no: users.bank_account_no,
//         mobile_no: users.phone_number,
//         funds: 200000
//     })

//}

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

//------- fetch vehicles based on status-----
app.post('/fetch-specific-vehicles-based-on-status',(req,res)=>{
    let vehicle_status=req.body.status;
    vehicle.findOne({where:{status:vehicle_status}}).then((result)=>{
        res.send(result.dataValues)
    }).catch((err)=>res.status(403).send(err))
})



//----- fetch all users vehicle except current
app.post('/fetch-vehicles-except-current-user',(req,res)=>{
    const Op = Sequelize.Op
    const user_id = req.body.user_id
    let collection =[]
    vehicle.findAll({where:{user_id:{[Op.ne]:user_id},status:"AVAILABLE"}}).then((result)=>{

        for (let i in result)
        {
            collection.push(result[i].dataValues)
        }

        res.send(collection)
    })

})

//------ Credit / Debit Card Routes
app.post('/pay-now',(req,res)=>{
    //to verify a card
    let card_details1 = req.body.card_details
    let cvv =card_details1.cvv

    console.log(card_details1);
    card_details.findOne({where:{card_no:card_details1.card_no}}).then((result)=>{
        if(result.dataValues.name!==card_details1.name)
        {
            res.status(404).send("Invalid Name on Card")
        }
        else if(result.dataValues.cvv!==parseInt(cvv))
        {
            res.status(404).send("Invalid CVV")

        }
        else if(result.dataValues.expiry_date!==card_details1.expiry_date)
        {
            res.status(404).send("Invalid Expiry Date")

        }
        // else if(result.dataValues.mobile_no!==card_details.mobile_no)
        // {
        //     res.status(404).send("Not a Registered Mobile Number")
        //
        // }
        else if(result.dataValues.funds<card_details1.amount)
        {
            res.status(404).send("Insufficient funds")

        }
        else
        {
            // const funds= result.dataValues.funds;
            res.send("VALID")
        }
    }).catch(e=>res.status(403).send("INVALID CARD"))
})
//---- request an OTP ----
app.post('/request-otp',(req,res)=>{
    const email=req.body.email;
    var secret = "IF2SKQRYHF4GOKCOGV3HCW2AMFVWCKSH"+email;
    var token = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });


// async..await is not allowed in global scope, must use a wrapper
    async function main(){

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:"gmail",
            secure: false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: "hpro401@gmail.com", // generated ethereal user
                pass: "Zenfone5" // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PocketWheelz" <pocketwheelz.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "OTP CONFIRMATION", // Subject line
            text: `Your OTP is : ${token}`, // plain text body

        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)
        
    }
    res.send("worked")
    main().catch(console.error);
    console.log('Otp sent')

    // res.send(token)

})


//--------------- Confirm payment  -----
app.post('/confirm-payment',(req,res)=>{
    //otp verification
    const email = req.body.email;
    const secret = "IF2SKQRYHF4GOKCOGV3HCW2AMFVWCKSH"+email;
    const token = req.body.token;
    const tokenValidates = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 6
    });

    let transactionType= req.body.transactionType;

    if(tokenValidates===true)
    {
        //deduct funds from user
        let bank_funds=null;

        if(transactionType==="rent")
        {
            card_details.findOne({where:{name:"Bank"}}).then((bank_details)=>{
                bank_funds=bank_details.dataValues.funds;
            })
            const sequelize = new Sequelize();

            let funds = req.body.funds;
            let amount = req.body.amount;
            return sequelize.transaction(function(t){
                return  card_details.update({funds:funds-amount},{where:{bank_account_no:req.body.bank_account_no}},{transaction:t}).then((result)=>{
                    return  card_details.update({funds:bank_funds+amount},{where:{name:"Bank"}},{transaction: t})

                })

            }).then((result)=>{
                res.send("Payment Made");
            })

        }
        else if(transactionType==="buy now") {
            card_details.findOne({where: {name: "Bank"}}).then((bank_details) => {
                bank_funds = bank_details.dataValues.funds;
            })
            const sequelize = new Sequelize();

            let funds = req.body.funds;
            let amount = req.body.amount;
            return sequelize.transaction(function (t) {
                return card_details.update({funds: funds - amount}, {where: {bank_account_no: req.body.client_bank_account_no}}, {transaction: t}).then((result) => {
                    return card_details.update({funds: bank_funds + amount}, {where: {name: "Bank"}}, {transaction: t})

                })

            }).then((result) => {
                res.send("Payment Made");
            }).catch(e=>res.status(402).send(e))
        }
        res.send("VALID")
    }
    else
    {
        res.status(404).send("Invalid OTP")
        return false;
    }



})
//----- Accessories-----
//------ Fetch All Accessories
app.post('/fetch-accessories',(req,res)=>{
    let result_array =[];
    accessory.findAll().then((result)=>{
       for (let i in result)
       {
           result_array.push(result[i].dataValues)
       }

        res.send(result_array)
    })
})

//---- Fetch Specific Accessory
app.post('/fetch-specific-accessory',(req,res)=>{
    accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((result)=>{
        res.send(result.dataValues)
    })
})

//--- Updating Product ---
app.post('/cartDetails',(req,res)=>{
    cart_storage.findAll({where:{user_id:req.body.user_id}}).then((result)=>{
        let details=[];
        for(let i in result)
        {
            details.push(result[i].dataValues)
            console.log(result[i].dataValues)
        }
        
        res.send(details);
    })
})


app.post('/addCart',(req,res)=>{

    const Op = Sequelize.Op;
    accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((result1)=> {
    if(result1.dataValues.accessory_qty===0)
    {
        res.send('Out Of Stock')
        return false;
    }

        cart_storage.findOne({where: {[Op.and]: [{user_id: req.body.user_id}, {accessory_id: req.body.accessory_id}]}}).then((result) => {

            if (result === null) {
                cart_storage.create({
                    user_id: req.body.user_id,
                    accessory_id: req.body.accessory_id,
                    quantity: 1

                }).then(() => {
                    // accessory.findOne({where: {accessory_id: req.body.accessory_id}}).then((result) => {
                    //     accessory.update({accessory_qty: result.dataValues.accessory_qty - 1}, {where: {accessory_id: req.body.accessory_id}}).then(() => {
                           res.send("Added To Cart")
                    //     })

                    // })

                })
            }
            else {

                res.send('Item Exist')
            }
        })

    })


})

app.post('/updateCart',(req,res)=>{
    const Op = Sequelize.Op;
    let quantity = req.body.quantity;
    accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((result)=>{
        let fetched_quantity= result.dataValues.accessory_qty;

        if(fetched_quantity >= quantity)
        {
           cart_storage.update({quantity:quantity},{where:{[Op.and]:[{accessory_id:req.body.accessory_id},{user_id:req.body.user_id}]}}).then(()=>{

        //cart_storage.update({accessory_qty:result.dataValues.accessory_qty-quantity},{where:{accessory_id:req.body.accessory_id}}).then(()=>{
                res.send("Added To Cart")
            })
          //  })
        }
        else
        {
            res.send("OUT OF STOCK"+{count:fetched_quantity})
        }



    })
})


// app.post('/updateCart1',(req,res)=>{
//     const Op = Sequelize.Op;
//     let fetchedQty=0;
//     if(req.body.quantity===0)
//     {
//         cart_storage.findOne({where:{[Op.and]:[{user_id:req.body.user_id,accessory_id:req.body.accessory_id}]}}).then((fetchQty)=>{
//             fetchedQty = fetchQty.dataValues.quantity;
//         })
//         cart_storage.destroy({where:{[Op.and]:[{user_id:req.body.user_id,accessory_id:req.body.accessory_id}]}}).then((result1)=>{
//             accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((result)=>{
//                 accessory.update({accessory_qty:result.dataValues.accessory_qty+fetchedQty},{where:{accessory_id:req.body.accessory_id}}).then(()=>{
//                     res.send("Added To Cart")
//                 })
//
//             })
//
//             res.send('Item Removed')
//         })
//
//     }
//     else {
//         accessory.findOne({where: {accessory_id: req.body.accessory_id}}).then((result) => {
//             let qty = result.dataValues.accessory_qty
//             let totalqty=0;
//             let cartqty=0;
//
//           cart_storage.findAll({where:{accessory_id:req.body.accessory_id}}).then((details)=>{
//               for(let i in details)
//               {
//                   totalqty = totalqty + details[i].dataValues.quantity
//                   cartqty = cartqty + details[i].dataValues.quantity
//               }
//               totalqty=totalqty+qty;
//               console.log("Cart "+cartqty+" total: "+totalqty)
//
//                 let available = totalqty - cartqty;
//                 console.log("Available"+available);
//
//
//
//                 cart_storage.findOne({where:{[Op.and]:[{user_id:req.body.user_id,accessory_id:req.body.accessory_id}]}}).then((result1)=>{
//                 let fetchedQuantity = result1.dataValues.quantity;
//                 console.log("fetchedQuantity"+fetchedQuantity)
//                     let updatedQuantity=0;
//
//                     updatedQuantity = fetchedQuantity - req.body.quantity
//                 console.log("Updated Quantity"+updatedQuantity);
//                 if(updatedQuantity===0)
//                 {
//                     res.send("No Changes Made in Cart")
//                     return false;
//                 }
//
//
//                 let quan = req.body.quantity+cartqty+available-req.body.quantity
//                 if(quan !== 10)
//                 {
//                     res.send("Insufficient Quantity")
//                     return false;
//                 }
//
//
//                 cart_storage.update({quantity: req.body.quantity}, {
//                     where: {
//                         [Op.and]: [{
//                             accessory_id: req.body.accessory_id,
//                             user_id: req.body.user_id
//                         }]
//                     }
//                 }).then((result1) => {
//                     accessory.update({accessory_qty: available+updatedQuantity}, {where: {accessory_id: req.body.accessory_id}}).then(() => {
//                         res.send("Item Updated")
//                     })
//                 })
//                 })
//
//         })
//         })
//     }
// })

app.post('/cartItems',async (req,res)=>{
    const Op = Sequelize.Op;
    let count="";
    let sendDetails={};
    let details=[];
    let accessory_details=[];
    let accessory_id=[];
    let cart_quantity=null;
    const start =await cart_storage.findAndCountAll({where:{user_id:req.body.user_id}}).then((result)=>{
      console.log(result)
        if(result.count===0)
        {
            res.send({count:0})
            return false;
        }
        count = result.count;

    for(let i in result.rows)
    {  accessory_id.push( result.rows[i].dataValues.accessory_id)
        details.push(result.rows[i].dataValues)

    }
  //  cart_quantity = result[0].dataValues.quantity

        accessory.findAll({where:{accessory_id:{[Op.in]:[accessory_id]}},include:[{model:cart_storage,where:{[Op.and]:[{user_id:req.body.user_id}]}}]}).then((result1)=>{
          for(let i in result1)
          {

              accessory_details.push(result1[i].dataValues)
          }
          console.log(accessory_details)
       //   accessory_details.push(cart_quantity);
            sendDetails ={
                count,accessory_details,accessory_id
            }

            res.send(sendDetails);
        })


    })






})

app.post('/removeCart',(req,res)=>{
    const Op = Sequelize.Op;

   cart_storage.findOne({where:{[Op.and]:[{user_id:req.body.user_id,accessory_id:req.body.accessory_id}]}}).then((result)=>{
       console.log(result)
       if(result===0)
        {
            res.send("Item does not exist")
        }
       else {
           cart_storage.destroy({where:{[Op.and]:[{user_id:req.body.user_id,accessory_id:req.body.accessory_id}]}}).then((result1) => {

               accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((details_cart)=>{
                   console.log(details_cart.dataValues.accessory_qty + req.body.quantity)
                accessory.update({accessory_qty: details_cart.dataValues.accessory_qty + req.body.quantity}, {where: {accessory_id: req.body.accessory_id}}).then(() => {

                    res.send('Item Removed')




                })
               })
            }).catch(e => res.send(e))

        }
   })

})

app.post('/buy-accessories',(req,res)=>{
    const Op = Sequelize.Op;
    let qty=null;
    cart_storage.findOne({where:{[Op.and]:{user_id:req.body.user_id,accessory_id:req.body.accessory_id}}}).then((acc)=>{
        if(acc===null)
        {
            res.send('Item Does Not exist in Cart')
            return false;
        }
        else {
            qty=acc.dataValues.quantity

                accessory.findOne({where:{accessory_id:req.body.accessory_id}}).then((result1)=> {
                    if(qty>result1.dataValues.accessory_qty)
                    {
                        res.send('Item out of stock')
                        return false;
                    }


            cart_storage.destroy({where:{[Op.and]:{user_id:req.body.user_id,accessory_id:req.body.accessory_id}}}).then((result)=>{




                    accessory.update({accessory_qty:result1.dataValues.accessory_qty - qty}, {where: {accessory_id: req.body.accessory_id}}).then((done) => {
                        res.send("Item removed From Cart");
                    })
                })


            })
        }
    })

})

//accessory buy
app.post('/direct-buy-check',(req,res)=>{
    let accessory_id = req.body.accessory_id;
    let user_id = req.body.user_id;
    let quantity = req.body.quantity;
    accessory.findOne({where:{accessory_id:accessory_id}}).then((result)=>{
        if(quantity>result.dataValues.accessory_qty)
        {
            res.send('Insufficient Stock');
        }
        else {
            res.send("Item Available")
        }

        }
    )
})

app.post('/direct-buy',(req,res)=>{
    try {
        accessory.findOne({where: {accessory_id: req.body.accessory_id}}).then((result) => {
                accessory.update({accessory_qty: result.dataValues.accessory_qty - req.body.quantity}).then(() => {

                    card_details.findOne({where: {bank_account_no: req.body.bank_account_no}}).then((bank_details) => {
                        if (bank_details.result.funds < req.body.amount) {
                            res.send('Insufficient Funds');
                            return false;
                        }
                        card_details.update({funds: bank_details.result.funds - req.body.amount}, {where: {bank_account_no: req.body.bank_account_no}}).then(() => {
                            card_details.findOne({where: {name: "Bank"}}).then((details) => {
                                card_details.update({funds: details.dataValues.funds + req.body.amount}, {where: {name: "Bank"}}).then(() => {


                                    card_details.update({funds: details.dataValues.funds - req.body.amount}, {where: {name: "Bank"}}).then(() => {
                                        card_details.update({funds: details.dataValues.funds + req.body.amount}, {where: {name: "Developer"}}).then(() => {
                                            res.send("Accessory Purchased")
                                        })
                                    })
                                })
                            })
                        })
                    })


                })
            }
        ).catch(e => res.send(e))
    }
    catch(err)
    {
        res.status(400).send(err);
    }
})



//-----Cancel a Booking ---
app.post('/cancel-booking',(req,res)=>{
    let my_job = schedule.scheduledJobs[req.body.user_client_id]
    my_job.cancel();
    vehicle.update({status:"AVAILABLE"},{where:{vehicle_id:req.body.vehicle_id}}).then(()=>{
        res.send("Booking Cancelled");
        }
    )

})
//--------------
app.listen(3001,()=>{
    console.log('Listening on port 3001')
})


