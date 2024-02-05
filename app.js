const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

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
const connectionString = 'mongodb://127.0.0.1/node-app';
var store = new mongoDbStore({
    uri: connectionString,
    collection: 'mySessions'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 Haftalık
    },
    store: store
}));

store.on('error', function(error) {
    console.log(error);
  });
  
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findOne({name: 'msoguz'})
    .then(user => {
        req.user = user;
        //console.log(req.user);
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

mongoose.connect(connectionString)
    .then(() => {
        app.listen(3000);
    })
    .catch(error => console.log(error))