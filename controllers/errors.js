module.exports.get404Page = (req, res) => {
    res.status(404).render('./errors/404',{
        isAuthenticated: req.session.isAuthenticated
    });
};

module.exports.get500Page = (req, res) => {
    res.status(500).render('./errors/500',{
        isAuthenticated: req.session.isAuthenticated
    });
};