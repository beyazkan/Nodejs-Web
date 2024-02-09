const session = require('express-session');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const env = require('../utility/environment.js');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(env.sendGridApiKey);

exports.getLogin = (req, res, next) =>{
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/login.pug', {
        path: '/login',
        title: 'Giriş Yap',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email: email})
    .then(user => {
        if(!user){
            req.session.errorMessage = "Sistemde kayıtlı mail adresi bulunamamıştır.";
            req.session.save(function(error){
                console.log(error);
                return res.redirect('/login');
            })
            
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
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;

    res.render('account/register.pug', {
        path: '/register',
        title: 'Kayıt Ol',
        errorMessage: errorMessage
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
            req.session.errorMessage = "Bu mail adresi ile daha önce kayıt olunmuştur.";
            req.session.save(function(error){
                console.log(error);
                
            });
            return res.redirect('/login');
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
        const msg = {
            to: email, // Change to your recipient
            from: 'm.sabri.oguz@gmail.com', // Change to your verified sender
            subject: 'Hesabınız oluşturuldu.',
            html: '<strong>Hesabınız başarılı bir şekilde oluşturuldu.</strong>',
        }

        sgMail.send(msg);
    })
    .catch(error => console.log(error))
}

exports.getReset = (req, res, next) =>{
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    
    res.render('account/reset.pug', {
        path: '/reset-password',
        title: 'Şifre Sıfırlama',
        errorMessage: errorMessage
    });
}

exports.postReset = (req, res, next) =>{

    const email = req.body.email;

    crypto.randomBytes(32, (error, buffer) => {
        if(error){
            console.log(error);
            return res.redirect('/reset-password');
        }
        const token = buffer.toString('hex');
        
        User.findOne({email:email})
        .then(user => {
            if(!user){
                req.session.errorMessage = 'Sistemde kayıtlı böyle bir email adresi bulunamamıştır.';
                req.session.save(function(error){
                    console.log(error);
                    return res.redirect('/reset-password');
                });
            }

            user.resetToken = token;
            user.resetTokenExpiration = Date.now()+3600000;

            return user.save();
        })
        .then(result => {
            res.redirect('/');

            const msg = {
                to: email, // Change to your recipient
                from: 'm.sabri.oguz@gmail.com', // Change to your verified sender
                subject: 'Parola Sıfırlama.',
                html: `<p> Parolanızı güncellemek için aşağıdaki linke tıklayınız.</p>
                <p>
                    <a href="http://localhost:3000/reset-password/${token}" target="_blank" >Şifre Sıfırlama</a>
                </p>`,
            }
    
            sgMail.send(msg);
        })
        .catch(error => {
            console.log(error);
        })
    })
}

exports.getLogout = (req, res, next) =>{
    req.session.destroy(err => {
        //console.log(err);
        res.redirect('/');
    });
}

exports.postLogout = (req, res, next) =>{
    res.redirect('/');
}

exports.getNewPassword = (req, res, next) =>{
    const token = req.params.token;

    User.findOne({resetToken: token, resetTokenExpiration: { $gt: Date.now()}})
    .then(user => {
        var errorMessage = req.session.errorMessage;
        delete req.session.errorMessage;

        res.render('account/new-password.pug', {
            path: '/new-password',
            title: 'Şifre Oluştur',
            errorMessage: errorMessage,
            userId: user._id.toString(),
            passwordToken: token
        });
    })
    .catch(error => {console.log(error)})
}

exports.postNewPassword = (req, res, next) =>{
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;
    let _user;

    User.findOne({
        resetToken: token, 
        resetTokenExpiration:{
            $gt: Date.now()
        },
        _id : userId
    })
    .then(user => {
        _user = user;
        return bcrypt.hash(newPassword, 10);
    })
    .then(hashedPassword => {
        _user.password = hashedPassword;
        _user.resetToken = undefined;
        _user.resetTokenExpiration = undefined;
        return _user.save();
    })
    .then(()=>{
        res.redirect('/login')
    })
    .catch(error => console.log(error));
}