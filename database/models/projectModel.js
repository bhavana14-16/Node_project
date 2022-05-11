const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectStartDate: {
      type: String,
      required : true
    },
    projectEndDate:{
      type: String,
      required: true
    },
    employeeId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee"
    }],
    managerId:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager"
    }]
  },
  { timestamps: true },
  { collection: "project" }
);


const Project = new mongoose.model('project', ProjectSchema);
module.exports = Project;




