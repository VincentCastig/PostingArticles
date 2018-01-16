
const nodemailer = require('nodemailer');

const dotenv = require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const path = require('path');
const port = 3000

const userCtrl = require('./public/controllers/userController');

const app = module.exports = express();
app.use(json());
app.use(cors());

const connectionString = process.env.DATABASE_URL; //Connects to heroku bro
app.use(express.static(path.join(__dirname, 'public')));
console.log('connetion', connectionString)
massive(connectionString).then(db => {app.set('db', db)});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.user,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret
    }
  });
  
  
   const send = ({ email, name, text }) => {
       console.log('sending', email, name, text)
    const from = name && email ? `${name} <${email}>` : `${name || email}`
    const message = {
      from,
      to: 'vincent.castig@gmail.com',
      subject: `New message from ${from} at creating-contact-forms-with-nodemailer-and-react`,
      text,
      replyTo: from
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(message, (error, info) => {
        console.log(message)
        console.log(info)
        console.log(error)
        return error ? reject(error) : resolve(info)
      }
      )
    })
  }


app.post('/postArticle', userCtrl.post_article);
app.get('/getAllArticles', userCtrl.get_all_articles);
app.get('/getArticle/:id', userCtrl.get_article);

app.post('/email', (req, res) => {
    const { email , name,  message } = req.body
    console.log(name);
    send({ email, name, text: message }).then(() => {
      console.log(`Sent the message "${message}" from <${name}> ${email}.`);
      res.redirect('/#success');
    }).catch((error) => {
      console.log(`Failed to send the message "${message}" from <${name}> ${email} with the error ${error && error.message}`);
      res.redirect('/#error');
    })
  })



app.listen(process.env.PORT, () => { console.log(`Listening on port: 3000`)});