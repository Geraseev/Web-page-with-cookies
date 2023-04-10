const Users = require('../models/Users')

const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {
    let config = {
        usernameField: "email", passwordField: "senha"
    }
    passport.use(new LocalStrategy(config, (email, senha, done) => {
        let user = Users.getElementByEmail(email, senha)
        if (user == null)
            return done(null, false, {message: "Falha ao realizar o login"})
        return done(null, user)
    }))

    passport.serializeUser((user, done) => {
        return done(null, user.email)
    })

    passport.deserializeUser((email, done) => {
        return done(null, Users.getElementByEmail(email))
    })
}