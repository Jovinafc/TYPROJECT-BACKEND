const user= require('./../models').user;
const jwt = require('jsonwebtoken')

var authenticate =(req,res,next)=>{
var token1 = req.header('authorization');
console.log(token1);
    const decodedToken= jwt.verify(token1,'secretkey',function(err,token){
           if(err)
           {
               res.status(401).send("Unauthorized");
               console.log("Unauthorized "+token1);
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