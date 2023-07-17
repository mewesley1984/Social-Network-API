const router = require("express").Router();
const { Users } = require("../../models/User");
const { Thoughts } = require("../../models/Thought");

router.route("/").get(async (req, res) => {
  try {
    const users = await Users.find().populate([
      {
        path: "friends",
        select: "-__v",
      },
      {
        path: "thoughts",
        select: "-__v",
        populate: {
          path: "reactions",
          select: "-__v",
        },
      },
    ]);
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const users = await Users.findOne({ _id: req.params.id }).populate([
      {
        path: "friends",
        select: "-__v",
      },
      {
        path: "thoughts",
        select: "-__v",
        populate: {
          path: "reactions",
          select: "-__v",
        },
      },
    ]);
    res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const addedUser = await Users.create(req.body);
    res.json(addedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/:id").patch(async (req, res) => {
  try {
    const updated = await Users.findOneAndUpdate(
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

// POST friends/:friendId
router.route("/:userId/friends/:friendId").post(async (req, res) => {
  try {
    const existingUser = await Users.findOne({ _id: req.params.userId });

    const updated = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { friends: [...existingUser.friends, req.params.friendId] } },
      { runValidators: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// DELETE friends/:friendId
router.route("/:userId/friends/:friendId").delete(async (req, res) => {
  try {
    const existingUser = await Users.findOne({ _id: req.params.userId });

    const updated = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          friends: existingUser.friends.filter(
            (el) => el.toString() !== req.params.friendId
          ),
        },
      },
      { runValidators: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    // Delete User
    const deletedUser = await Users.findOneAndDelete({ _id: req.params.id });

    // BONUS: Delete related thoughts
    const deletedThoughts = await Thoughts.deleteMany({
      username: deletedUser.username,
    });
    console.log(
      "Deleted " +
        deletedThoughts.deletedCount +
        " thoughts from username =" +
        deletedUser.username
    );

    res.json(deletedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
