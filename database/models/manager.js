const mongoose = require("mongoose");
const ManagerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      index: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    projectId: {
      type: Number,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    businessUnit: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Manager" }
);

const Manager = new mongoose.model('employee', EmployeeSchema);
module.exports = Manager;

