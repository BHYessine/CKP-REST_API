const user = require("../models/User");

//Add user
exports.addUser = async (req, res) => {
  try {
    const checkUser = await user.findOne({ email: req.body.email });
    if (checkUser) {
      return res
        .status(400)
        .send({ message: "Email aleardy used : ", checkUser });
    }
    const newUser = new user(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: " New User added successfully : ", newUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Find all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    res
      .status(200)
      .send({ message: " Here is the list of Users : " }, allUsers);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Update user
exports.updateUser = async (req, res) => {
  try {
    const checkUser = await user.findById(req.params.id);
    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "No User with this Id, Check it please!!" });
    }
    const editUser = await user.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body, updatedAt: Date.now() } }
    );
    const editedUser = await user.findById(req.params.id);
    res
      .status(200)
      .send({ message: "User updated successfully : ", editedUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndRemove(req.params.id);
    res
      .status(200)
      .send({ message: "User deleted successfully : ", deletedUser });
  } catch (err) {
    res.status(500).send(err);
  }
};
