exports.getLogin = (req, res, next) =>{
    res.render('account/login.pug', {
        path: '/login',
        title: 'Giriş Yap'
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
        title: 'Kayıt Ol'
    });
}

exports.postRegister = (req, res, next) =>{
    res.redirect('/');
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
    res.redirect('/');
}

exports.postLogout = (req, res, next) =>{
    res.redirect('/');
}