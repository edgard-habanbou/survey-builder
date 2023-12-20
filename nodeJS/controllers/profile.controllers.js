const User = require("../models/user.model");

const upload_image = async (req, res) => {
  const { image } = req.files;
  const userId = req.user._id;

  if (!image) return res.sendStatus(400);

  const image_dir = __dirname + "/images/" + image.name;
  image.mv(image_dir);

  User.findByIdAndUpdate(userId, { image: image.name });

  res.sendStatus(200);
};

module.exports = {
  upload_image,
};
