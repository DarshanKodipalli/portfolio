const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var config = require('./config/sysProps');
var nodemailer = require('nodemailer');
var mail = require('./templates/mail');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.smtp.gmail.user,
        pass: config.smtp.gmail.password
    }
});


const app = express();


app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/api', (req, res, next) => {
    res.send('API Status: I\'m awesome')
});


app.post('/api/email', (req, res, next) => {

    console.log(req.body);
    var user = req.body.emailContent;
    emailTemplate = mail.signup(user.name, user.email, user.subject, user.message);
    const mailOptions = {
        from: config.smtp.gmail.user, // sender address
        to: user.email+".com", // list of receivers Add BCC too
        subject: 'Thank you for getting in Touch with Darshan', // Subject line
        html: emailTemplate// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          console.log(err)
        }
        else{
            const mailOptions = {
                from: config.smtp.gmail.user, // sender address
                to: "darshan.kodipalli@gmail.com", // list of receivers Add BCC too
                subject: 'Someone accessed your application. Get in Touch', // Subject line
                html: "From: "+user.name+" | Email: "+user.email + " | Subject: " + user.subject + " | Message: " + user.message// plain text body
              };
              transporter.sendMail(mailOptions,function(err, info){
                  if(err){
                      console.log(err);
                  }else{
                      res.json({message:"email Sent",status:1});
                      console.log(info);
                  }
              })
          console.log(info);
        }
     });


});
app.listen(3030, '0.0.0.0');