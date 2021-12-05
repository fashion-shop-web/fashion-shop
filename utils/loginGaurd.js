function LoginGaurd(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function LoginedGaurd(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/admin');
    }
}

module.exports = {
    LoginedGaurd,
    LoginGaurd
}

