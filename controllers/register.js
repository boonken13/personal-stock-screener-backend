const mongoDb = require("./../db_modules/dbProperties");
const dbUtils = require("./../db_modules/dbUtils");

const register = {
  handleRegister: async (req, res, bcrypt) => {
    console.log(req.body);
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    const userId = await dbUtils.incrementAndGetCounter("userId").catch(err => console.log(err));
    let userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hash,
      userId: userId
    };
    let newUser = new mongoDb.collection_user(userData);
    return newUser.save().then(
      (newUser) => {
        return res.status(200).json(newUser)
      },
      err => {
        return res.status(400).json(err)
      }
    );
  }
}

module.exports = register;


