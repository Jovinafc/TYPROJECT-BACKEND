const nodemailer = require('node-mailer')

const generate_email_attachment =async (email,subject,text,filename)=>{

    async function main() {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false,
            tls: {rejectUnauthorized: false},
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
            attachments: [{
                filename: 'Invoice.pdf',
                path: `uploads/${filename}`,
                contentType: 'application/pdf'
            }]

        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)
    }
    main().catch(console.error)
}





module.exports={generate_email_attachment}