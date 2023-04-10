const express = require('express')
const router = express.Router()

const Eventos = require('../models/Evento')
const Users = require('../models/Users')

router.get("/", (req, res) => {
    let error = ""
    if (req.session.messages != undefined) {
        error = req.session.messages.pop()
    }
    res.render("index", {
        eventos: Eventos.publicos(), 
        email: req.cookies.email,
        error: error
    })
});

router.get("/novo", function (req, res) {
    res.render("new-user", {});
});

router.post("/create", function (req, res) {
    Users.new({
        ...req.body,
    })

    res.redirect("/");
});

router.get("/edit", function (req, res) {
    res.render("edit", {});
});

router.post("/edit", function (req, res) {
    if (req.session.isUserLogged) {
        res.cookie("nome", req.body.nome, {maxAge: 7 * 24 * 60 * 60 * 1000})
        Users.update(req.body.id, req.body.nome)
        res.redirect("/intranet");
    }
})

router.get("/eventos", function (req, res) {
    res.render("eventos", {eventos: Eventos.todos()});
});

router.get("/restrito", function (req, res) {
    res.redirect("/intranet");
});

router.get("/logout", (req, res) => {
    req.session.isUserLogged = false;
    req.logout()
    res.redirect("/")
});

router.get("/intranet", function (req, res, next) {
    if (req.session.isUserLogged) {
        res.render("restrito", {nome: req.cookies.nome });
      } else {
        res.render("error", {
          message: "ERROR - 401 - UNAUTHORIZED",
          error: error
        });
      }
});

router.post("/login", function (req, res) {
    const { email, senha } = req.body;
    let user = Users.getElementByEmail(email);
    if (user && senha === user.senha) {
        req.session.isUserLogged = true;
        res.cookie("email", user.email, {maxAge: 7 * 24 * 60 * 60 * 1000})
        res.redirect("/intranet");
    }
    else {
        res.clearCookie("nome")
        res.render("error", {
            message: "ERROR - 400 - BAD REQUEST",
            error: error
        });
    }
})

module.exports = router