const mongoDb = require("./../db_modules/dbProperties");


const register = {
  handleRegister: (req, res, bcrypt) => {
    const { email, name, password } = req.body;
    console.log(req.body);
    if (!email || !name || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    let userData = {
      email: email,
      name: name,
      password: hash
    };
    let newUser = new mongoDb.collection_user(userData);
    return newUser.save().then(
      () => {
        return res.status(200).json("Player register successfully")
      },
      err => {
        return res.status(400).json(err)
      }
    );
  }
}

module.exports = register;


