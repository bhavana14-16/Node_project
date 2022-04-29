const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
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
    taskassignedDate: {
        type: String,
        required: true,
    },
    createdAt:{
        type:String,
        required: true,
    },
    updatedAt:{
        type:String,
        required: true,
    },
    deletedAt:{
        type:String,
        required: true,
    },
    taskName:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        enum: ["pending", "in progress", "complete","approved"],
        default: "pending",
    },
  },
  { timestamps: true },
  { collection: "task" }

);


const task = new mongoose.model('task', TaskSchema);
module.exports = task;




