import express from "express";
import Todo from "../model/todo.model.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', isAuthenticated , async (req, res) => {
    try {
      const { title, description,isCompleted } = req.body;
  
      const newTodo = new Todo({ title, description,isCompleted ,user: req.user._id});
      await newTodo.save();
      res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id; 
        const todos = await Todo.find({ user: userId });
        res.status(200).json(todos);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        await Todo.findByIdAndDelete(id);
        res.send("deleted");
    }
    catch(err){
        res.status(500).send(err.message);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(id, 
            { title, description, isCompleted }, { new: true });
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/mytodos", isAuthenticated, async (req, res) => {
   try{
    const userid  = req.user._id;
    const todos = await Todo.find({user: userid});
    res.status(200).json({success: true, message: "my all todo", todos});
   }catch(err){
       res.send(err.message).sendStatus(500);
   }
});
export default router;
