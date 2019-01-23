const user= require('./../models').user;
const jwt = require('jsonwebtoken')

var authenticate =(req,res,next)=>{
var token = req.header('x-auth');

    const decodedToken= jwt.verify(token,'secretkey',function(err,token){
           if(err)
           {
               res.status(401).send("Unauthorized");
               return false;
           }
           else if(token)
           {
               console.log('Authorized');
               next();
           }
        }
    )


}

module.exports={authenticate}