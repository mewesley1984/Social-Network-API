const router = require("express").Router();
const { Thoughts } = require("../../models/Thought");
const { Users } = require("../../models/User");

router.route("/").get(async (req, res) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const users = await Thoughts.findOne({ _id: req.params.id })
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const added = await Thoughts.create(req.body);

    // update user object with new thought ID
    const existingUser = await Users.findOne({ username: added.username });
    const updated = await Users.findOneAndUpdate(
      { _id: existingUser._id },
      { $set: { thoughts: [...existingUser.thoughts, added._id] } },
      { runValidators: true, new: true }
    );
    
    res.json({added, updated});
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/:id").patch(async (req, res) => {
  try {
    const updated = await Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
