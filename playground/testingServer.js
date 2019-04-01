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
const Sequelize = require('sequelize');
const schedule = require('node-schedule');
const moment = require('moment')
const {authenticate} = require('./../middleware/authenticate');
const speakeasy = require('speakeasy');
const messagebird = require('messagebird')('qI8MEqDZ9CXHedPy870iEVIcx');
const otplib = require('otplib');
const nodemailer = require("nodemailer");
const url = require('url');
const PDFDocument = require('pdfkit')
const fs = require('fs')
const pdfInvoice = require('pdf-invoice')
const blobStream  = require('blob-stream');
const browserify = require('browserify')
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
const rent = require('./../models').rent
const owner = require('./../models').owner
const client = require('./../models').client
const {generatePdf,fileName} = require('./../methods/generate-pdf')
const {generate_email_attachment}= require('./../methods/generate-email-attachments')
const {create_transaction} = require('./../methods/transaction-creation')
const {generate_email}= require('./../methods/generate-email')

//-----------Cloudinary
cloudinary.config({
    cloud_name: 'beast0013',
    api_key: '317643389281754',
    api_secret: '0UQHQHXe4QU_aqg6gtbOxuPUO0g'
});

app.post('/pdf-done',async (req,res)=>{
ItemName=["shampoo"]
ItemQty=[1]
ItemPrice=[100]
GrandTotal=100
    const pdf=await generatePdf("Test",ItemName,ItemQty,ItemPrice,GrandTotal)


    setTimeout(function () {
        var file = `uploads/${fileName}.pdf`
        data1 = fs.readFileSync(file);
        data= data1.toString('base64')
        generate_email_attachment("lioneldsouza51@gmail.com","test","test",fileName,data)
        res.send("Email Sent")
        fs.exists(`uploads/${fileName}.pdf`, function (exists) {
            if (exists) {

                console.log('File exists. Deleting now ...');
                fs.unlink(`uploads/${fileName}.pdf`);
            } else {

                console.log('File not found, so not deleting.');
            }
        });


    },5000)

})

app.get('/test123',(req,res)=> {
    var file = "uploads/file-1554029972996.pdf"
    data = fs.readFileSync(file);
    console.log(data.toString('base64'))

})


app.post("/send-email-test",(req,res)=>{
    generate_email("beast0013@mailinator.com","test","test")
    res.send("Email Sent")
})
// middleware logic
app.post('/test-middleware',authenticate,(req,res)=>{
    console.log('Worked')
    let test = req.body.users;
    res.send('worked '+test)
})


app.post('/pdf-invoice',(req,res)=>{
    const document = pdfInvoice({
        company: {
            phone: '(99) 9 9999-9999',
            email: 'company@evilcorp.com',
            address: 'Av. Companhia, 182, Água Branca, Piauí',
            name: 'Evil Corp.',
        },
        customer: {
            name: 'Elliot Raque',
            email: 'raque@gmail.com',
        },
        items: [
            {amount: 50.0, name: 'XYZ', description: 'Lorem ipsum dollor sit amet', quantity: 12},
            {amount: 12.0, name: 'ABC', description: 'Lorem ipsum dollor sit amet', quantity: 12},
            {amount: 127.72, name: 'DFE', description: 'Lorem ipsum dollor sit amet', quantity: 12},
        ],
    })

    document.generate() // triggers rendering
    document.pdfkitDoc.pipe(fs.createWriteStream('uploads/file.pdf'))


})

app.get('/test-pdf-2',(req,res)=>{
    // create a document and pipe to a blob
    var doc = new PDFDocument();
    var stream = doc.pipe(blobStream());

// draw some text
    doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

// some vector graphics
    doc
        .save()
        .moveTo(100, 150)
        .lineTo(100, 250)
        .lineTo(200, 250)
        .fill('#FF3300');

    doc.circle(280, 200, 50).fill('#6600FF');

// an SVG path
    doc
        .scale(0.6)
        .translate(470, 130)
        .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        .fill('red', 'even-odd')
        .restore();
let lorem= "Hello World Sup"
// and some justified text wrapped into columns
    doc
        .text('And here is some wrapped text...', 100, 300)
        .font('Times-Roman', 13)
        .moveDown()
        .text(lorem, {
            width: 412,
            align: 'justify',
            indent: 30,
            columns: 2,
            height: 300,
            ellipsis: true
        });

// end and display the document in the iframe to the right
    doc.end();
    stream.on('finish', function() {
        stream.toBlobURL('application/pdf');
    });
})

app.get('/test-pdf',(req,res)=>{
    pdfItemNames =["Bike shampoo","Car shampoo"]
    pdfItemQuantity=[1,2]
    pdfPrice =[100,200]
    const doc= new PDFDocument;
    doc.pipe(fs.createWriteStream(`uploads/file-${Date.now()}.pdf`));
    //const stream = doc.pipe(blobStream());

    // write to PDF
    doc.text('Invoice from Ride Wheelz',200,10)
        doc.moveDown(1);
    doc.text("Customer Name:- Test",10,40)
    doc.text(`Invoice no:-${Math.floor(Math.random() * 1000) + 1 }`,450,10)
    doc.text('Sr no',100,60)
    for(let i=1;i<=pdfItemNames.length;i++)
    {
        doc.text(i,100,60+(i*15));
    }
    doc.text("Item Name",150,60)
    for(let i=0,j=1;i<pdfItemNames.length;i++,j++)
    {
        doc.text(pdfItemNames[i],150,60+(j*15));
    }
    doc.text("Quantity",450,60)
    for(let i=0,j=1;i<pdfItemQuantity.length;i++,j++)
    {
        doc.text(pdfItemQuantity[i],450,60+(j*15));
    }
    doc.text("Price",500,60)

    let y=null;
    for(let i=0,j=1;i<pdfPrice.length;i++,j++)
    {
        doc.text(pdfPrice[i],500,60+(j*15));
        y=60+(j*30)
    }
    doc.text("Grand Total 10000",400,y)


    doc.pipe(res);                                       // HTTP response
    doc.end()


})

app.post('/test-email',(req,res)=>{
    const {generate_email}=require('./../methods/generate-email')
    generate_email("beast0013@mailinator.com","test","Hello")

})

app.post('/test-owner',(req,res)=>{
    //clientResult.dataValues.user_id,owner_id,vehicles.vehicle_id,user_id,vehicle_type,clientResult.dataValues.name,"Bank",amount,"In Transaction"
    create_transaction(1,1,1,1,"Two-Wheelers","Test","Bank","Jovin",5000,"SOLD")
    res.send('worked')

})


app.post('/request-email',(req,res)=>{


// async..await is not allowed in global scope, must use a wrapper
    async function main(){

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:"gmail",

            auth: {
                user: "hpro401@gmail.com", // generated ethereal user
                pass: "Zenfone5" // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PocketWheelz" <pocketwheelz.com>', // sender address
            to: "beast0013@mailinator.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: `${token}`, // plain text body
            //html: "<b>Hello world?</b>" // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

           }
    res.send("worked")
    main().catch(console.error);
})




// const secret = `${'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'+email}`
//------- message testing
app.post('/request-otp',(req,res)=>{
    const email=req.body.email




//      const secret = `${'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'+email}`
// // Alternatively: const secret = otplib.authenticator.generateSecret();
//     console.log(secret)
//     let token = otplib.authenticator.generate(secret);

    //var secret = speakeasy.generateSecret({length: 20});
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

            auth: {
                user: "hpro401@gmail.com", // generated ethereal user
                pass: "Zenfone5" // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"PocketWheelz" <pocketwheelz.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "OTP", // Subject line
            text: `Your OTP is : ${token}`, // plain text body
           // html: "<b>Hello world?</b>" // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

    }

    main().catch(console.error);
    res.send("Worked")

})


app.post('/message',(req,res)=>{
   //  const email = req.body.email;
   //   const secret = `${'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'+email}`
   //  console.log(secret)
   // let token = req.body.token;
   //
   //  const check = otplib.authenticator.verify({ token, secret });
   //  if(check===true)
   //  {
   //      res.send("Valid OTP");
   //      console.log("VALID OTP");
   //
   //  }
   //  else
   //  {
   //      res.send("Invalid OTP");
   //      console.log("INVALID OTP");
   //  }
    const email = req.body.email;
    const secret = "IF2SKQRYHF4GOKCOGV3HCW2AMFVWCKSH"+email;
    const token = req.body.token
    const tokenValidates = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 6
    });

       if(tokenValidates===true)
       {
           res.send("Valid OTP")
       }
       else
       {
           res.send("Invalid OTP")
       }


})



//----- testing logic
app.post('/test-chaining',(req,res)=>{
    let user_id= req.body.user_id
    const vehicle1= vehicle.create({
        vehicle_type:req.body.type,
        price:req.body.price
    }).then(result=>{
        let test=result.dataValues.vehicle_id;
        console.log(result.dataValues.vehicle_id)
        res.send('Worked'+test)
        console.log('User_id'+user_id)
    }).catch(e=>res.send(e))
})

app.post('/math',(req,res)=>{
    const sequelize = new Sequelize({
        database: 'test',
        username: 'root',
        password: 'root',
        dialect: 'mysql'
    });
    // sequelize.query('select accessory_id, sum(quantity) from test.cart_storages where accessory_id = :id group by accessory_id',{replacements:{id:10},type: sequelize.QueryTypes.SELECT}).then((result)=>{
    //     console.log(result)
    //     let display=[];
    //     for(let i in result)
    //     {
    //         display.push(result[i])
    //     }
    //
    //     res.send(display)
    // })

    sequelize.query('select * from ')
})
//--- maps ---

//------ Filter test

app.get('/filter',(req,res)=>{
    const Op = Sequelize.Op;
    console.log(req.query.vehicle_id.split(','));
    console.log(req.query.user_id.split(','))
    // let query=JSON.stringify(req.query.vehicle_id.split(','));
    // let urlQuery = url.parse(req.url,true).query;
    let display =[];
    // vehicle.findAll({where:{[Op.or]:urlQuery}}).then((result)=>{
    //     for(let i in result)
    //     {
    //         display.push(result[i].dataValues)
    //     }
    // })
    console.log(display)
    setTimeout(function () {
        res.send(display)
    },100)

})




/* testing scheduling*/

app.post('/schedule-testing',(req,res)=>{
    let date= new Date(req.body.date);
 //let test =[1,2,3];
  //  moment(date).format()
  //   let d = new Date(date.getFullYear(),date.getMonth(),date.getDay(),date.getHours(),date.getMinutes());
   // console.log(d)


    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();


    let playstuff = req.body.name;

        var date1 = new Date(year, month, day, hours, minutes, 0);
        console.log(date)


    if(req.body.type === "Test") {
        res.send('Task Initiated ' + date1)
        var j =
            schedule.scheduleJob(playstuff, date1, function () {
                console.log(playstuff)
                console.log('change made')
                // vehicle.update({status: "RENTED"}, {where: {vehicle_id: req.body.vehicle_id}}).then(() => {
                //
                // })


            })
    }

         if(req.body.type==="Cancel")
          {
              let my_job = schedule.scheduledJobs[playstuff]
              console.log(my_job)
              my_job.cancel();
              res.send('Task Cancelled'+date1);
          }




})
//----- testing trasaction
app.post('/transaction',(req,res)=>{
create_transaction(1,1,1,"Two-Wheelers","Bank","Test","Sold")
    res.send('Sold')
})


//sending details of all users except current
app.post('/test1',(req,res)=>{
const Op = Sequelize.Op
const user_id = req.body.user_id
    let collection =[]
    vehicle.findAll({where:{user_id:{[Op.ne]:user_id}}}).then((result)=>{
        //console.log(result)
        for (let i in result)
        {
            collection.push(result[i].dataValues)
        }

        user.findOne({where:{user_id:1}}).then((test1)=>{
            console.log(test1.dataValues.first_name+' '+test1.dataValues.last_name)
        })
        res.send(collection)
    })

})

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
var uploadProfileImage = multer({ storage: storage }).single('profileImage');
app.post('/profile', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
            res.send('error')
        }


        // cloudinary.v2.uploader.upload(`uploads/${filename}`,
        //     function(error, result) {
        //         imageURL=result.url
        //         //console.log(imageurl)
        //     });

       res.json('Worked');

        // Everything went fine.
    })
    uploadProfileImage(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        } else if (err) {
            // An unknown error occurred when uploading.
            res.send('error')
        }
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
            expiresIn:3600
        },(err, token) => {
            if (err) {
                console.log(err)
            }
            generateToken=token;
            return token;
        });



         jwt.verify(generateToken,'secretkey',function(err,token){

             console.log(token)
            var expiresIn=3600;
             var date = new Date(token.exp)
             console.log(date)
             const sendData={token,expiresIn}
             res.send(sendData);
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






//----filtering
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
                    // console.log(result[vehicle].dataValues)
                }


            }).catch(e => res.send(e))
            // res.send(filteredResult)
            // console.log(filteredResult)


        }

        else if (filter === 'brand') {
            const filteringResults = await vehicle.findAll({where: {brand: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }

        else if (filter === 'model') {
            const filteringResults = await vehicle.findAll({where: {model: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }
        else if (filter === 'fuel_type') {
            const filteringResults = await vehicle.findAll({where: {fuel_type: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }
        else if (filter === 'year') {
            const filteringResults = await vehicle.findAll({where: {year: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }
        else if (filter === 'registration_state') {
            const filteringResults = await vehicle.findAll({where: {registration_state: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }
        else if (filter === 'km_driven') {
            const filteringResults = await vehicle.findAll({where: {km_driven: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }
        else if (filter === 'price_per_day') {
            const filteringResults = await vehicle.findAll({where: {price_per_day: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }


        else if (filter === 'price') {
            const filteringResults = await vehicle.findAll({where: {price: value}}).then((result) => {
                for (let vehicle in result) {
                    filteredResult.push(result[vehicle].dataValues)

                }


            }).catch(e => res.send(e))
            // console.log(filteredResult)
            // res.send(filteredResult)
        }


    }

     res.send(filteredResult)
    console.log(filteredResult)






})

app.post('/test-filter',(req,res)=>{
    let condition = req.body;
   // console.log(condition)
    let filterOption =[];
    let filterValue =[];
    let result =[];
    var obj = {};
    for(let i in condition)
    {
        obj[condition[i].filterOption] = condition[i].filterValue

        //console.log(Object.keys(condition[i]))

    }
    result.push(obj)

    let test = JSON.stringify(result);
    // var nietos = [];
    //
    // obj["01"] = "Test";
    // obj["02"] = "Value";
    // nietos.push(obj);




    console.log(test)

    res.send(test)


})



app.post('/fetch-specific-vehicle/:id',(req,res)=>{
    let vehicle_id= req.params.id;
    vehicle.findOne({where:{vehicle_id:vehicle_id}}).then((result)=>{
        res.send(result.dataValues)
    }).catch(error=>res.status(400).send(error))

})


app.post('/fetch-user',(req,res)=>{
    let user_id = req.body.user_id;
    user.findOne({where:{user_id:user_id}}).then((result)=>{
        res.send(result.dataValues)
    }).catch(error=>res.status(400).send(error))
})


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


//------------- delete account
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

//-------- renting logic -------
app.post('/rent',async (req,res)=>{
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
            vehicle.update({status:'Rented'},{where:{vehicle_id:owner_details[0].vehicle_id}}).then(()=>{
                res.send('All Worked')
            })
        })





})

//

app.listen(3001,()=>{
    console.log('Listening on port 3001')
})
