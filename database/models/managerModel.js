const mongoose = require("mongoose");
const ManagerSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
      },
    role: {
        type: String,
        required: true,
        default:"manager"
      },
    businessUnit: {
      type: String,
     // required: true,
    }

  },
  { collection: "Manager" },  { timestamps: true }
);

const Manager = new mongoose.model('Manager', ManagerSchema);
module.exports = Manager;

