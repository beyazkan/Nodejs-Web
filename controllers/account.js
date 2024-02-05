const User = require('../models/user.js');

exports.getLogin = (req, res, next) =>{
    res.render('account/login.pug', {
        path: '/login',
        title: 'Giriş Yap',
        isAuthenticated: req.session.isAuthenticated
    });
}

exports.postLogin = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;
    if((email == 'email@gmail.com') && (password == '1234')){
        // req.isAuthenticated = true;
        //res.cookie('isAuthenticated', true);
        req.session.isAuthenticated = true;
        res.redirect('/');
    }else{
        // req.isAuthenticated = false
        res.cookie('isAuthenticated', false);
        res.redirect('/login');
    }
}

exports.getRegister = (req, res, next) =>{
    
    res.render('account/register.pug', {
        path: '/register',
        title: 'Kayıt Ol',
        isAuthenticated: req.session.isAuthenticated
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
            return es.redirect('/register');
        }
        const newUser = new User({
            name:name,
            email: email,
            password: password,
            cart: { items: []}
        });
        return newUser.save();
    })
    .then(() => {
        res.redirect('login');
    })
    .catch(error => console.log(error))
    

    res.redirect('/login');
}

exports.getReset = (req, res, next) =>{
    res.render('account/reset.pug', {
        path: '/reset-password',
        title: 'Şifre Sıfırlama',
        isAuthenticated: req.session.isAuthenticated
    });
}

exports.postReset = (req, res, next) =>{
    res.redirect('/');
}

exports.getLogout = (req, res, next) =>{
    res.redirect('/');
}

exports.postLogout = (req, res, next) =>{
    res.redirect('/');
}