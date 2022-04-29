const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    password:{
        type: String,
        required: true,
    },
    createdby:{  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      index: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default:"employee"
    },
    createdat: {
      type: String
    },
    updatedat: {
        type: String
    },
    businessUnit:{
        type:String,
        required: true,
    },
    isDeleted:{
      type:Boolean
    }
  },

  { collection: "employee" },
  { timestamps: true }
);

const Employee = new mongoose.model('employee', EmployeeSchema);
module.exports = Employee;




