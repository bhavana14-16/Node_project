const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
    {
        taskStartDate: {
            type: String,
            required: true,
        },
        taskEndDate: {
            type: String,
            required: true,
        },
        taskDescription: {
            type: String,
            required: true
        },
        taskName: {
            type: String,
            required: true,
        },
        projectId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
          }],
       employeeId:[{
           type : mongoose.Schema.Types.ObjectId,
           ref: 'employee'
       }],
        status: {
            type: String,
            enum: ["pending", "in progress", "complete", "approved"],
            default: "pending",
        },
    },
    { timestamps: true },
    { collection: "task" }
);
const task = new mongoose.model('task', TaskSchema);
module.exports = task;




