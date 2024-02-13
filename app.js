const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csurf = require('csurf');
const env = require('./utility/environment.js');
const multer = require('multer');

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
const connectionString = env.localConnectionString;
var store = new mongoDbStore({
    uri: connectionString,
    collection: 'mySessions'
});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage: storage}).single('image'));
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
    if(!req.session.user){
        return next();
    }

    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        //console.log(req.user);
        next();
    })
    .catch(error => { console.log(error) })
})
app.use(csurf());


// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

// Hata Sayfaları
app.use(errorController.get500Page);
app.use(errorController.get404Page);
app.use((error, req, res, next) =>{
    res.status(500).render('./errors/500.pug', {title:'Error'});
})

mongoose.connect(connectionString)
    .then(() => {
        app.listen(3000);
    })
    .catch(error => console.log(error))