const mongoose = require("mongoose");

const ProjectEmployeeSchema = new mongoose.Schema(
{
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager",
        index: true,
        required: true,
      },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        index: true,
        required: true,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        index: true,
        required: true,
     },
    projectassignedDate: {
        type: String,
        required: true,
    },
    
  },
  { timestamps: true },
  { collection: "projectemployee" }

);


const projectemployee = new mongoose.model('projectemployee', ProjectEmployeeSchema);
module.exports = projectemployee;




