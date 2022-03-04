const mongoDb = require("./../db_modules/dbProperties");

const handleProfileGet = (req, res) => {
  const { id } = req.params;
  return mongoDb.collection_user.findOne({userId: id}).lean().then(
    user => {
      return user ? res.status(200).json(user) : res.status(400).json("user not found");
    },
    err => {
      return res.status(400).json('error getting user');
    }
  );
}

const handleProfileUpdate = (req, res) => {
  const { id } = req.params
  const { name, age, pet } = req.body.formInput
  db('users')
  .where({ id })
  .update({ name: name })
  .then(resp => {
    if (resp) {
      res.json("success")
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json('error updating user'))
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}