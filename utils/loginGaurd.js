function LoginGaurd(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function LoginedGaurd(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    LoginedGaurd,
    LoginGaurd
}

