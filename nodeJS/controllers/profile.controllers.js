const User = require("../models/user.model");

const upload_image = async (req, res) => {
  const { image } = req.files;
  const userId = req.user._id;

  if (!image) return res.sendStatus(400);

  const image_name = Date.now() + "." + image.name.split(".").pop();

  const { dirname } = require("path");
  const appDir = dirname(require.main.filename);
  const image_dir = appDir + "/public/images/" + image_name;
  image.mv(image_dir);

  await User.findByIdAndUpdate(userId, {
    image: image_name,
  });

  res.send("Image uploaded");
};

const get_user = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  upload_image,
  get_user,
};
