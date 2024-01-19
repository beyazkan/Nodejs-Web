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

// Database
const sequelize = require('./utility/database.js');
const Category = require('./models/category.js');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cartItem.js');

const errorController = require('./controllers/errors.js');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => {
        console.log(error);
    });
});

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

//Product.hasOne(Category);
Product.belongsTo(Category,{foreignKey: { allowNull: false }});
Category.hasMany(Product);
Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

let _user;
sequelize
//.sync({force: true})
.sync()
.then(() => {
    User.findByPk(1)
    .then(user => {
        if(!user){
            return User.create({name:'msoguz', email:'email@gmail.com'});
        }
        return user;
    })
    .then(user => {
        _user = user;
        return user.getCart();

    })
    .then(cart => {
        if(!cart){
            return _user.createCart();
        }

        return cart;
    })
    .then(() =>{
        Category.count()
        .then(count => {
            if(count === 0){
                Category.bulkCreate([
                    {name:'Telefon', description:'Telefon kategorisi'},
                    {name:'Bilgisayar', description:'Bilgisayar kategorisi'},
                    {name:'Elektronik', description:'Elektronik kategorisi'},
                ]);
            }
        });
    })
})
.catch(error => {
    console.log(error);
});

// 404 Hatası
app.use(errorController.get404Page);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});