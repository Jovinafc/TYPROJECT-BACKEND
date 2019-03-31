

const jwt = require('jsonwebtoken')
let generateToken;
var jwtDetails={
    user_id:1,
    email:"test@gmail.com"
};
//--------- generating token using email and user_id -------------------------
const jwtCreation=jwt.sign(jwtDetails,'secretkey',{
    expiresIn: '1h'
},(err,token)=>{
    if(err)
    {
        console.log(err)
    }
    generateToken=token;
    console.log(generateToken)
});



