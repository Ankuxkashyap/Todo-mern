import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;