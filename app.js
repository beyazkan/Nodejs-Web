const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

// App Set
app.set('view engine', 'pug');
app.set('views', './views');

// Import Routes Modules
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/shop.js');

const errorController = require('./controllers/errors.js');
const mongoConnect = require('./utility/database.js').mongoConnect;

const User = require('./models/user.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByUserName('msoguz')
    .then(user => {
        req.user = new User(user.name, user.email, user._id);
        next();
    })
    .catch(error => { console.log(error) })
})

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

// 404 Hatası
app.use(errorController.get404Page);

mongoConnect(() => {
    User.findByUserName('msoguz')
    .then(user => {
        if(!user){
            user = new User('msoguz', 'msoguz@gmail.com');
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

    
});