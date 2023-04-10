const Users = require('../models/Users')


module.exports = {
    estaLogado: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.session.messages = ["Usuário não autenticado"]
        res.redirect("/")
    },
    ehAdmin: function(req, res, next) {
        if (req.isAuthenticated() && Users.isAdmin(req.user)) {
            return next()
        }

        if (req.isAuthenticated()) {
            res.redirect("/intranet")
        } else {
            req.session.messages = ["Sem autorização"]
            res.redirect("/")
        }
    },
    login: function(req, res, next) {
        let user = Users.getElementByEmail(process.env.ADMIN)
        
        req.login(user, (err) => {
            if (!err) res.redirect("/restrito")
            else res.redirect("/")
        })
    }
}