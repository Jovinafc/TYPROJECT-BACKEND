//--- packages --
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app =express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const multer = require('multer');
const inventory = require('./../models').inventory;
const cloudinary = require('cloudinary')


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());


//----models-----
const twoWheeler = require('./../models').twoWheeler
const fourWheeler = require('./../models').fourWheeler
const vehicle = require('./../models').vehicle;
const user = require('./../models').user;

//-----------Cloudinary
cloudinary.config({
    cloud_name: 'beast0013',
    api_key: '317643389281754',
    api_secret: '0UQHQHXe4QU_aqg6gtbOxuPUO0g'
});


//file - upload
let filename=''
let imageURL=''
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
         filename=file.fieldname + '-' + Date.now()+'.jpg';
        cb(null, filename)

    }
})


var upload = multer({ storage: storage }).single('image');

app.post('/profile', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }

        cloudinary.v2.uploader.upload(`uploads/${filename}`,
            function(error, result) {
                imageURL=result.url
                //console.log(imageurl)
            });

     //   res.json('Worked');

        // Everything went fine.
    })
})




//-------
////--------------- Store vehicle details of sell/lend into vehicle table------------
app.post('/store-vehicle-details',(req,res)=>{
    var vehicles = req.body.vehicles;
        console.log(imageURL)


    vehicle.create({
        vehicle_type:vehicles.type,
        brand:vehicles.brand,
        model:vehicles.model,
        fuel_type:vehicles.fuel,
        year:vehicles.year,
        registration_state:vehicles.registration_state,
        km_driven:vehicles.km_driven,
        number_plate:vehicles.number_plate,
        price:vehicles.price,
        image:imageURL,
        documents:vehicle.documents
    }).then((result)=>{
        res.json('worked')
        console.log('Data Inserted')
    }).catch(e=>console.log(e))


})

//------------------
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
    vehicle.findAll({attributes:['vehicle_id','vehicle_type','brand','model','fuel_type','year','registration_state','km_driven','number_plate','price_per_day','image','documents','price','status']}).then((result)=>{
        for(var i=0;i<result.length;i++)
        {
            vehicle_details.push(result[i])
        }

        res.send(vehicle_details)
    })
})

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











//------------
///----JWT
app.get('/api',(req,res)=>{
    res.send('Welcome to API')
})

app.post('/password',async (req,res)=>{
    try{
        let generateToken='';
        let generatePassword='';
        var jwtDetails={
            user_id:1,
            email:req.body.email,
        };
        const saltRounds = 10;

        const tokenCreation=await jwt.sign(jwtDetails, 'secretkey',{
            expiresIn: '1h'
        },(err, token) => {
            if (err) {
                console.log(err)
            }
            generateToken=token;
            return token;
        });



         jwt.verify(generateToken,'secretkey',function(err,token){

             console.log(token.exp)
                 res.send('worked');
         })


        // var users=req.body;
        // const passwordCreation=await bcrypt.hash(req.body.password, saltRounds).then((result) => {
        //     generatePassword=result
        //     return result
        // }).catch(e=>res.send(e));

        //
        // const data=await user.create({
        //     email:req.body.email,
        //     password:generatePassword,
        //     token:generateToken
        //
        // }).then(result=>{
        //     res.send('Data Saved in User Table')
        // }).catch(e=>res.send(e))




    }
    catch(e){
        // res.send(e)
        console.log(e)
    }


})
app.get('/inventoryProducts',(req,res)=>{
    let products =[];
    inventory.findAll({attributes:['product_id','product_name','Quantity','Price']}).then((product)=>{
         for(var i=0;i<product.length;i++)
         {
            products.push(
                {"id":product[i].dataValues.id,
                    "name":product[i].dataValues.name,
                    "Quantity":product[i].dataValues.Quantity,
                    "Price":product[i].dataValues.Price
                }
                )

         }

         res.send(products)
    console.log(products)
    })
})

app.post('/addProduct',(req,res)=>{
    inventory.create({
    id:2,
    name:'test',
    Quantity:101,
    Price:100
}).then(()=>{
    res.send('worked');
})
})

app.post('/update',async (req,res)=>{

// inventory.create({
//     id:2,
//     name:'test',
//     Quantity:101,
//     Price:100
// }).then(()=>{
//     res.send('worked');
// })

    let qty;
    const find=await inventory.findOne({attributes:['Quantity'],where:{product_id:1}}).then((currentQty)=> {
        qty = currentQty.dataValues.Quantity;
        return qty;

    }).catch(e=>res.status(404).send(e))

    if(find === 0)
    {

        if(req.body.updateType === 'add')
        {
            const next =await inventory.update({
                Quantity:find+1
            },{where:{
                    product_id:1
                }}).then(()=>{
                res.send({
                        success:true,
                        quantity:find+1
                    }

                )
                console.log(qty+1)
            }).catch(e=>res.status(404).send(e))

        }
        else
        {
            res.send("OUT OF STOCK")
        }


        return;
    }


    if(req.body.updateType === 'add')
    {
        const next =await inventory.update({
            Quantity:find+1
        },{where:{
                product_id:1
            }}).then(()=>{
            res.send({
                    success:true,
                    quantity:find+1
                }

            )
            console.log(qty+1)
        }).catch(e=>res.status(404).send(e))

    }
  else if(req.body.updateType === 'delete')
    {
        const next =await inventory.update({
            Quantity:qty-1
        },{where:{
                product_id:1
            }}).then(()=>{
            res.send({
                success:true,
                quantity:qty-1
            })
            console.log(qty-1)
        }).catch(e=>res.status(404).send(e))
    }

    else
    {
        res.send('INVALID')
    }
});











app.post('/api/posts',(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err)
        {
            res.status(404).send('error')
        }
        else{
            res.send(authData)
        }
    })

})



app.post('/api/login',(req,res)=>{
    //Mock User
    // const user ={
    //     id:1,
    //     username:'lionel',
    //     email:'lionel@gmail.com'
    //
    // }

    jwt.sign({user:user},'secretkey',(err,token)=>{
        if(err)
        {
            return res.status(404).send("ERROR");
        }
        res.send({
            token
        })
    });
})
//---postman testing
app.post('/store-vehicle-detail',(req,res)=>{
    var vehicles = req.body
    vehicle.create({
        vehicle_type:vehicles.type,
        brand:vehicles.brand,
        model:vehicles.model,
        fuel_type:vehicles.fuel,
        year:vehicles.year,
        registration_state:vehicles.registration_state,
        km_driven:vehicles.km_driven,
        number_plate:vehicles.number_plate,
        price:vehicles.price,
        image:vehicles.image,
        documents:vehicle.documents
    }).then((result)=>{
        res.send('Data Inserted')
    }).catch(e=>console.log(e))



})

//------------------------


app.get('/test',(req,res)=>{
    vehicle.findAll({where:{vehicle_id:11}}).then((result)=>{
        res.send(result.image)
    })
})

//------------------ server testing
app.post('/sign-in',async (req,res)=>{
    let fetchedEmail = req.body.email;
    let fetchedPassword = req.body.password;
    let storedPassword='';
    let sendData=[];
   const data=await user.findOne({attributes:['user_id','email','password','token'],where:{email:fetchedEmail}}).then((User)=>{
        if(!User)
        {
            return res.status(403).send('User Does Not Exist')

        }
        else
        {
            storedPassword=User.password;
            const match= bcrypt.compareSync(fetchedPassword,storedPassword)
            if(match)
            {
                console.log(User.user_id)
                sendData.push(User.user_id)
                sendData.push(User.token)
                res.send(sendData)
            }
            else
            {
                res.status(403).send('Invalid Password')
            }


        }

    }).catch(e=>res.send(e))



})


app.listen(3001,()=>{
    console.log('Listening on port 3001')
})
