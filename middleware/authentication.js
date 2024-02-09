module.exports = (req, res, next) => {
    if(!req.session.isAuthenticated){
        // req.session.redirectTo = req.url;
        // req.session.redirectTo = req.protocol + '://' + req.get('host') + req.originalUrl;
        req.session.redirectTo = req.originalUrl;
        //console.log(req.session.redirectTo);
        return res.redirect('/login');
    }

    next();
}