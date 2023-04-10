const Users = require('../models/Users')

module.exports = function(req, res, next) {
    const { email } = req.body;
    let user = Users.getElementByEmail(email);
    if (req.body.lembrar) {
        res.cookie("email", user.email, req.body.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
    } else {
        res.clearCookie("email")
    }
    return next()
}