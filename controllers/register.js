const mongoDb = require("./../db_modules/dbProperties");
const dbUtils = require("./../db_modules/dbUtils");

const register = {
  handleRegister: async (req, res, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    const userId = await dbUtils.incrementAndGetCounter("userId").catch(err => console.log(err));
    let userData = {
      email: email,
      name: name,
      password: hash,
      userId: userId
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


