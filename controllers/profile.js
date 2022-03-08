const mongoDb = require("./../db_modules/dbProperties");

const profile = {
  handleProfileGet: (req, res) => {
    const { id } = req.params;
    return mongoDb.collection_user
      .findOne({ userId: id }, { password: 0 })
      .lean()
      .then(
        (user) => {
          return user
            ? res.status(200).json(user)
            : res.status(400).json("user not found");
        },
        (err) => {
          return res.status(400).json("error getting user");
        }
      );
  },
  handleProfileUpdate: (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, address, city, country, postalCode, aboutMe } =
      req.body;
    if (!id) {
      return res.status(400).json("id not found");
    }
    let updateData = {
      firstName: firstName || "",
      lastName: lastName || "",
      address: address || "",
      city: city || "",
      country: country || "",
      postalCode: postalCode || "",
      aboutMe: aboutMe || "",
    };

    return mongoDb.collection_user.updateOne({ userId: id }, updateData).then(
      () => {
        res.status(200).json("successfully updated user");
      },
      (err) => {
        return res.status(400).json("error updating user");
      }
    );
  },
};

module.exports = profile;
