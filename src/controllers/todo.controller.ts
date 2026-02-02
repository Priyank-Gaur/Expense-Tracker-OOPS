import { ToDoService } from "../services/todo.service";
import express from 'express';
import { Request,Response } from "express";

class ToDoController{
    todoService  = new ToDoService();
    app = express()

    getAllTaskRoutes = async(req:Request,res:Response)=>{
        const task  = await this.todoService.getTask()
        res.json(task)
    }
}