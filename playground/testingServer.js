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

app.use(bodyParser.json());
app.use(cors());


//----models-----
const twoWheeler = require('./../models').twoWheeler
const fourWheeler = require('./../models').fourWheeler
const vehicle = require('./../models').vehicle;
const user = require('./../models').user;

//file - upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpg')
    }
})




var upload = multer({ storage: storage }).single('profileImage');

app.post('/profile', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
        }
        res.json('Worked');
        console.log('Worked')
        // Everything went fine.
    })
})

//-----------Cloudinary
cloudinary.config({
    cloud_name: 'beast0013',
    api_key: '317643389281754',
    api_secret: '0UQHQHXe4QU_aqg6gtbOxuPUO0g'
});

cloudinary.v2.uploader.upload("uploads/profileImage-1546533157112.jpg",
    function(error, result) {
    console.log(result.url)});




//------------------

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
