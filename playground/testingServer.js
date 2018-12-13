//--- packages --
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app =express();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//----models-----
const twoWheeler = require('./../models').twoWheeler
const fourWheeler = require('./../models').fourWheeler
const vehicle = require('./../models').vehicle;
const user = require('./../models').user;



app.use(bodyParser.json());
app.use(cors());
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
