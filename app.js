const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//define schema (mongoose)
const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static')) //for serving static files
app.use(express.urlencoded())


app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory


//end points
app.get('/', (req,res)=>{
    const params = {'title': 'Faaiz Website'}
    res.status(200).render('home.pug', params);
})


app.get('/contact', (req,res)=>{
    const params = {'title': 'Faaiz Website'}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the DataBase")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the DataBase")
    })
    // res.status(200).render('contact.pug');
})


//start the server
app.listen(port, ()=>{
    console.log(`server listeing on port ${port}`);
})