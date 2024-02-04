const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// App Set
app.set('view engine', 'pug');
app.set('views', './views');

// Import Routes Modules
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/shop.js');
const accountRoutes = require('./routes/account.js');

const errorController = require('./controllers/errors.js');
//const mongoConnect = require('./utility/database.js').mongoConnect;

const User = require('./models/user.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findOne({name: 'msoguz'})
    .then(user => {
        req.user = user;
        console.log(req.user);
        next();
    })
    .catch(error => { console.log(error) })
})


// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

// 404 Hatası
app.use(errorController.get404Page);

mongoose.connect('mongodb://127.0.0.1/node-app')
    .then(() => {
        console.log('Connected to mongodb');
        User.findOne({name: 'msoguz'})
        .then(user => {
            if(!user){
                user = new User({
                    name: 'msoguz',
                    email: 'mustafasabri.oguz@saglik.gov.tr',
                    cart: {
                        items: []
                    }
                });
                return user.save();
            }
            return user;
        })
        .then(user => {
            console.log(user);
            app.listen(3000);
        })
        .catch(error => {
            console.log(error);
        })

        //app.listen(3000);
    })
    .catch(error => console.log(error))