let nodemailer = require('nodemailer')

const generate_email =async (email,subject,text)=>{
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
        from: '"Ride Wheelz" <ridewheelz.com>', // sender address
        to: `${email}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body

    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

}





module.exports={generate_email}