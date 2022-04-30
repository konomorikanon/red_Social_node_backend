const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,

    }
})

const sendMailOpt = (email, token) =>  {
    
    return {
        from: process.env.EMAIL,
        to: email,
        subject: 'redApp desde node js',
        text: 'texto verifica tu password',
        html: `
        <div class="">
            <a
                style="
                    text-decoration: none;
                    background: #0d6efd;
                    color: white;
                    padding: 10px;
                    margin: 10px 0;
                    display: block;
                    width: 200px;
                    text-align: center;
                "
                href='http://localhost:3000/auth/token/${token}'> confirmar email </a>
        </div>

        `
    }
}
const sendmailer = (email,token) => {
    return new Promise((resolve, reject) => {

        transporter.sendMail(sendMailOpt(email, token), (err, info) => {
            if (err) {
                reject(err)
                
            }else{
                resolve(info)
            }

            
        })
    })

}

module.exports = {
    sendmailer
}