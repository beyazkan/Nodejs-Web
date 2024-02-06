const session = require('express-session');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) =>{
    res.render('account/login.pug', {
        path: '/login',
        title: 'Giriş Yap'
    });
}

exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email: email})
    .then(user => {
        if(!user){
            return res.redirect('/login');
        }

        bcrypt.compare(password, user.password)
        .then(isSuccess => {
            if(isSuccess){
                req.session.user = user;
                req.session.isAuthenticated = true;
                return req.session.save(function(error){
                    var url = req.session.redirectTo || '/';
                    delete req.session.redirectTo;
                    res.redirect(url);
                });
            }else{
                res.redirect('/login');
            }
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

exports.getRegister = (req, res, next) =>{
    
    res.render('account/register.pug', {
        path: '/register',
        title: 'Kayıt Ol'
    });
}

exports.postRegister = (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordAgain = req.body.passwordAgain;

    User.findOne({email: email})
    .then(user => {
        if(user){
            return res.redirect('/register');
        }

        return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => {
        const newUser = new User({
            name:name,
            email: email,
            password: hashedPassword,
            cart: { items: []}
        });
        return newUser.save();
    })
    .then(() => {
        res.redirect('/login');
    })
    .catch(error => console.log(error))
}

exports.getReset = (req, res, next) =>{
    res.render('account/reset.pug', {
        path: '/reset-password',
        title: 'Şifre Sıfırlama'
    });
}

exports.postReset = (req, res, next) =>{
    res.redirect('/');
}

exports.getLogout = (req, res, next) =>{
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}

exports.postLogout = (req, res, next) =>{
    res.redirect('/');
}