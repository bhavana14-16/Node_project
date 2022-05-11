const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        default: "employee"
      }
    },
    { collection: "employee" },
    { timestamps: true }
  );
const Employee = new mongoose.model('employee', EmployeeSchema);
module.exports = Employee;




