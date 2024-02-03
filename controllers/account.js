exports.getLogin = (req, res, next) =>{
    res.render('account/login.pug', {
        path: '/login',
        title: 'Giriş Yap'
    });
}

exports.postLogin = (req, res, next) =>{
    res.redirect('/');
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