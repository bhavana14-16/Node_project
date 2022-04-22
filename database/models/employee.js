const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    // empId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Employee",
    //   index: true,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    businessUnit:{
        type:String,
        required: true,
    },
    project:{
        type:String,
        required: true,
    }
  },

  { collection: "employee" }

);


const Employee = new mongoose.model('employee', EmployeeSchema);
module.exports = Employee;




