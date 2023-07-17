const router = require("express").Router();
const { Reaction } = require("../../models/Reaction")
 
router.route("/").get(async (req, res) => {
  try {
    const data = await Reaction.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const added = await Reaction.create(req.body);
    res.json(added);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;