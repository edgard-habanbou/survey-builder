const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Type = mongoose.model("Type", typeSchema);
async function insertPredefinedTypes() {
  try {
    const count = await Type.countDocuments();

    if (count === 0) {
      await Type.insertMany([
        {
          _id: "657f0445f4aaced6b5b8d7af",
          name: "Radio",
        },
        {
          _id: "657f052bf4aaced6b5b8d7b0",
          name: "Checkbox",
        },
        {
          _id: "657f0553f4aaced6b5b8d7b1",
          name: "Input",
        },
      ]);
    }
  } catch (err) {
    console.error(err);
  }
}
insertPredefinedTypes();
module.exports = Type;
