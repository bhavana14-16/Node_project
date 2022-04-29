const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    businessUnit:{
        type:String,
        required: true,
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
        index: true,
        required: true,
      },
  },
  { timestamps: true },
  { collection: "project" }
);


const Project = new mongoose.model('project', ProjectSchema);
module.exports = Project;




