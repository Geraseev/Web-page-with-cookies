let ids = 0;
let users = [];

module.exports = {
  new(user) {
    let newUser = {
      id: ++ids,
      email: user.email,
      senha: user.senha,
      nome: user.nome
    };
    users.push(newUser);
    return newUser;
  },
  update(id, nome) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      users[pos].nome = nome;
    }
  },
  getElementById(id) {
    let pos = this.getPositionById(id);
    if (pos >= 0) {
      return users[pos];
    }
    return null;
  },
  getPositionById(id) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  getElementByEmail(email) {
    let findedUser;
    users.forEach((user) => {
      if (user.email === email) findedUser = user;
      else findedUser = null;
    });
    return findedUser;
  },
  delete(id) {
    let i = this.getPositionById(id);
    if (i >= 0) {
      users.splice(i, 1);
      return true;
    }
    return false;
  },
};
